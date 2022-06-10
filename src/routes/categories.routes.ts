import multer from "multer";
import { Router } from "express";
import { CreateCategoryController } from "../modules/cars/useCases/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/ImportCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/ListCategories/ListCategoriesController";

const categoriesRouters = Router();

const upload = multer({
	dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRouters.post("/", createCategoryController.handle);

categoriesRouters.get("/", listCategoriesController.handle);

categoriesRouters.post("/import", upload.single("file"), importCategoryController.handle);

export { categoriesRouters };
