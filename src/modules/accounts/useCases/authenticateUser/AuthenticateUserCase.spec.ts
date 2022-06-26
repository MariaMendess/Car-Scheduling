import { AppError } from "@errors/AppError";
import { AuthenticateUserUseCase } from "./AutheticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

const user: ICreateUserDTO = {
	driver_license: "123456789",
	email: "mahh@test.com",
	password: "123456",
	name: "Mahh",
};

describe("Authenticate User", () => {
	beforeEach(async () => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

		await createUserUseCase.execute(user);
	});

	it("should be able to authenticate an user", async () => {
		const reuslt = await authenticateUserUseCase.execute({
			email: "mahh@test.com",
			password: "123456",
		});
		expect(reuslt).toHaveProperty("token");
	});

	it("should not be able to authenticate an user with invalid email", async () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: "maria@test.com",
				password: "123456",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to authenticate an user with invalid email", async () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: "maria@test.com",
				password: "123456",
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
