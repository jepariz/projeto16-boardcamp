import { Router } from "express";
import { createCustomer } from "../controllers/userControllers/createCustomer.controller.js";
import {customerValidation} from "../middlewares/customerValidation.middleware.js"


const router = Router();

//router.get("/customers", listCustomers)

//router.get("/customers/:id", findCustomer)

router.post("/customers", customerValidation, createCustomer)

//router.put("customers/:id", customerValidation, updateCustomer)


export default router