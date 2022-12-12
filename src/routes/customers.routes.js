import { Router } from "express";
import { createCustomer } from "../controllers/customersControllers/createCustomer.controller.js";
import {customerValidation} from "../middlewares/customerValidation.middleware.js"
import { updateCustomer } from "../controllers/customersControllers/updateCustomer.controller.js";
import { listCustomers } from "../controllers/customersControllers/listCustomer.controller.js";
import { findCustomer } from "../controllers/customersControllers/findCustomer.controller.js";

const router = Router();

router.get("/customers", listCustomers)

router.get("/customers/:id", findCustomer)

router.post("/customers", customerValidation, createCustomer)

router.put("/customers/:id", customerValidation, updateCustomer)


export default router