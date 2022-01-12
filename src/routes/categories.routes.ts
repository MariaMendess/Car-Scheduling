import { Router } from "express";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/service/CreateCategoryService";

const categoriesRouter = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouter.post("/", (req, res) => {

    const { name, description } = req.body;

    const createCategoryService = new CreateCategoryService(categoriesRepository);

    createCategoryService.execute({ name, description });

    return res.status(201).send();
})

categoriesRouter.get("/", (req, res) => {
    const all = categoriesRepository.list();

    return res.status(200).json(all);

})

export { categoriesRouter }