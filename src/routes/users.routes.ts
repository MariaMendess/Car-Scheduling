import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const createUserController = new CreateUserController();

const usersRouters = Router();

usersRouters.post("/", createUserController.handle);

export { usersRouters };
