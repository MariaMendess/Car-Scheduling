import { Router } from "express";
import uploadConfig from "../../../../config/upload";

import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListAvailableCarsController } from "@modules/cars/useCases/ListAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/CreateCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/UploadCarImages/UploadCarImagesController";
import multer from "multer";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
	"/specification/:id",
	ensureAuthenticated,
	ensureAdmin,
	createCarSpecificationController.handle
);

carsRoutes.post(
	"/images/:id",
	ensureAuthenticated,
	ensureAdmin,
	upload.array("images"),
	uploadCarImagesController.handle
);

export { carsRoutes };
