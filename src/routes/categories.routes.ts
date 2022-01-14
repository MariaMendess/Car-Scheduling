import  multer from "multer";
import { Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/CreateCategory";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const categoriesRouter = Router();

const upload = multer({
    dest: "./tmp",
});

categoriesRouter.post("/", (req, res) => {
    return createCategoryController.handle(req, res);
})

categoriesRouter.get("/", (req, res) => {
    return listCategoriesController.handle(req, res);
})

categoriesRouter.post("/import", upload.single("file"), (req, res) => {
    const {file} = req;
    console.log(file);
    return res.send();
})

export { categoriesRouter }