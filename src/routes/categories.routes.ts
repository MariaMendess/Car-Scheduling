import multer from "multer";
import { Router } from "express";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";
import { importCategoryController } from "../modules/cars/useCases/ImportCategory";
import { CreateCategoryController } from "../modules/cars/useCases/CreateCategory/CreateCategoryController";

const categoriesRouter = Router();

const upload = multer({
	dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRouter.post("/", createCategoryController.handle);

categoriesRouter.get("/", (req, res) => {
	return listCategoriesController.handle(req, res);
});

categoriesRouter.post("/import", upload.single("file"), (req, res) => {
	return importCategoryController.handle(req, res);
});

export { categoriesRouter };
