import express from "express";
import { categoriesRouter } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRouter);
app.use("/specifications", specificationsRoutes);

app.listen(3000, () => console.log('Server on!'));