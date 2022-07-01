import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let car1 = {
	name: "car1",
	description: "description1",
	daily_rate: 400,
	license_plate: "ABC-1111",
	fine_amount: 100,
	brand: "brand1",
	category_id: "2688c81a-9831-40d2-b8e4-23b5dc9c42ae",
};

let car2 = {
	name: "car2",
	description: "description2",
	daily_rate: 400,
	license_plate: "ABC-2222",
	fine_amount: 100,
	brand: "brand2",
	category_id: "2688c81a-9831-40d2-b8e4-23b5dc9c42ae",
};

describe("List Car", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
	});

	it("sholud be able to list all available cars", async () => {
		car1 = await carsRepositoryInMemory.create(car1);
		car2 = await carsRepositoryInMemory.create(car2);

		const cars = await listAvailableCarsUseCase.execute({});

		expect(cars).toHaveLength(2);
		expect(cars).toEqual([car1, car2]);
	});

	it("sholud be able to list all available cars by name", async () => {
		car1 = await carsRepositoryInMemory.create(car1);
		car2 = await carsRepositoryInMemory.create(car2);

		const cars = await listAvailableCarsUseCase.execute({ name: "car1" });

		expect(cars).toEqual([car1]);
	});

	it("sholud be able to list all available cars by brand", async () => {
		car1 = await carsRepositoryInMemory.create(car1);
		car2 = await carsRepositoryInMemory.create(car2);

		const cars = await listAvailableCarsUseCase.execute({ brand: "brand2" });

		expect(cars).toEqual([car2]);
	});

	it("sholud be able to list all available cars by category_id", async () => {
		car1 = await carsRepositoryInMemory.create(car1);
		car2 = await carsRepositoryInMemory.create(car2);

		const cars = await listAvailableCarsUseCase.execute({
			category_id: "2688c81a-9831-40d2-b8e4-23b5dc9c42ae",
		});

		expect(cars).toEqual([car1, car2]);
	});
});
