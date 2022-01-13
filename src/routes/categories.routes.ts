import { Router } from "express";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/CreateCategory";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const categoriesRouter = Router();

categoriesRouter.post("/", (req, res) => {
    return createCategoryController.handle(req, res);
})

categoriesRouter.get("/", (req, res) => {
    return listCategoriesController.handle(req, res);
})

export { categoriesRouter }