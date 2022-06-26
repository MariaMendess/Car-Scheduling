import { Router } from "express";
import { usersRouters } from "./users.routes";
import { categoriesRouters } from "./categories.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { specificationsRoutes } from "./specifications.routes";

const router = Router();

router.use("/categories", categoriesRouters);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRouters);
router.use(authenticateRoutes);

export { router };
