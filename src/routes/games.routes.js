import { Router } from "express";
import { categoryValidation } from "../middlewares/categoryValidation.middleware.js";
import { createCategory } from "../controllers/gamesControllers/createCategory.controller.js";
import { listCategories } from "../controllers/gamesControllers/listCategories.controller.js";
import { listGames } from "../controllers/gamesControllers/listGames.controller.js";

const router = Router();

router.get("/categories",listCategories)

router.post("/categories", categoryValidation, createCategory)

router.get("/games", listGames)

//router.post("/games",gameValidation, createGame )


export default router