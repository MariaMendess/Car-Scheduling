import dayjs from "dayjs";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalsUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

const dayAdd24hours = dayjs().add(24, "hour").toDate();

const rental: ICreateRentalDTO = {
	user_id: "123456",
	car_id: "121212",
	expected_return_date: dayjs().toDate(),
};

const rentalDate: ICreateRentalDTO = {
	user_id: "123456",
	car_id: "121212",
	expected_return_date: dayAdd24hours,
};

describe("Create Rental", () => {
	beforeEach(() => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
		dayjsDateProvider = new DayjsDateProvider();
		createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider);
	});

	it("should be able to create a new rental", async () => {
		const newRental = await createRentalUseCase.execute(rentalDate);

		expect(newRental).toHaveProperty("id");
		expect(newRental).toHaveProperty("start_date");
	});

	it("should not be able to create a new rental if there is another open to same car", async () => {
		expect(async () => {
			await createRentalUseCase.execute(rental);
			await createRentalUseCase.execute(rental);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a new rental if there is another open to same user", async () => {
		expect(async () => {
			await createRentalUseCase.execute(rental);
			await createRentalUseCase.execute(rental);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a new rental with invalid return time", async () => {
		expect(async () => {
			await createRentalUseCase.execute(rental);
		}).rejects.toBeInstanceOf(AppError);
	});
});
