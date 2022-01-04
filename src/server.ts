import express from "express";
import { categoriesRouter } from "./routes/categories.routes";

const app = express();

app.use(express.json())

app.use("/categories", categoriesRouter)

app.listen(3000, () => console.log('Server on!'));