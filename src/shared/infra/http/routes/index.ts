import { Router } from "express";
import { usersRouters } from "./users.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { specificationsRoutes } from "./specifications.routes";
import { rentalsRoutes } from "./rental.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRouters);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalsRoutes);
router.use(authenticateRoutes);

export { router };
