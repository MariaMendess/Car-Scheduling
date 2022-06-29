import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let car = {
	name: "Fusca",
	description: "Description Car",
	daily_rate: 100,
	license_plate: "ABC-1234",
	fine_amount: 60,
	brand: "Brand",
	category_id: "category",
};

describe("Create car", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
	});

	it("should be able to create a new car", async () => {
		const newCar = await createCarUseCase.execute(car);
		expect(newCar).toHaveProperty("id");
	});

	it("should not be able to create a new car with the same license plate", async () => {
		expect(async () => {
			await createCarUseCase.execute(car);
			await createCarUseCase.execute(car);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should be able to create a new car with available true", async () => {
		const newCar = await createCarUseCase.execute(car);
		expect(newCar.available).toBe(true);
	});
});
