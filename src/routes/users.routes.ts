import multer from "multer";
import { Router } from "express";
import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const usersRouters = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

usersRouters.post("/", createUserController.handle);

usersRouters.patch(
	"/avatar",
	ensureAuthenticated,
	uploadAvatar.single("avatar"),
	updateUserAvatarController.handle
);

export { usersRouters };
