import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

const car_id = "1234";
const specification_id = ["5678"];

let car = {
	name: "Fusca",
	description: "Description Car",
	daily_rate: 100,
	license_plate: "ABC-1234",
	fine_amount: 60,
	brand: "Brand",
	category_id: "category",
};

let specification = {
	name: "test",
	description: "Description test",
};

describe("Create Car Specification", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepositoryInMemory,
			specificationsRepositoryInMemory
		);
	});

	it("should not be able to add a new specification to a now-existent car", async () => {
		expect(async () => {
			await createCarSpecificationUseCase.execute({ car_id, specification_id });
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should be able to add a new specification to the car", async () => {
		const newCar = await carsRepositoryInMemory.create(car);
		const newSpecification = await specificationsRepositoryInMemory.create(specification);
		const specificationsCars = await createCarSpecificationUseCase.execute({
			car_id: newCar.id,
			specification_id: [newSpecification.id],
		});

		expect(specificationsCars).toHaveProperty("specifications");
		expect(specificationsCars.specifications).toHaveLength(1);
	});
});
