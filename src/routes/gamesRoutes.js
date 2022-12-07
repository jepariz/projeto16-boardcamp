import { Router } from "express";

const router = Router();

router.get("/categories",listCategories)

router.post("/categories", categoryValidation, createCategory)


export default router