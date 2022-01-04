import { Router } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRouter = Router();

const categoriesRepository = new CategoriesRepository();


categoriesRouter.post("/", (req, res) => {
    const { name, description } = req.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);

    if(categoryAlreadyExists){
        return res.status(400).json({err: "Category Already Exists!"})
    }



    categoriesRepository.create({name, description});

    return res.status(201).send();
})

categoriesRouter.get("/", (req, res) => {
    const all = categoriesRepository.list();

    return res.status(200).json(all);

})

export { categoriesRouter }