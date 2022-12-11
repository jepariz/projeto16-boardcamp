import { Router } from "express";
import { categoryValidation } from "../middlewares/categoryValidation.middleware.js";
import { createCategory } from "../controllers/createCategory.controller.js";
import { listCategories } from "../controllers/listCategories.controller.js";

const router = Router();

router.get("/categories",listCategories)

router.post("/categories", categoryValidation, createCategory)


export default router