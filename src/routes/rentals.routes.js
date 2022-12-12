import { Router } from "express";
import { createRental } from "../controllers/rentalsControllers/createRental.controller.js";
import { listRentals } from "../controllers/rentalsControllers/listRentals.controller.js";
import { updateRentalReturn } from "../controllers/rentalsControllers/updateRentalReturn.js";
import { rentalValidation } from "../middlewares/rentalValidation.middleware.js";
import { returnValidation } from "../middlewares/returnValidation.middleware.js";


const router = Router();

router.get("/rentals", listRentals)

router.post("/rentals", rentalValidation, createRental)

router.post("/rentals/:id/return", returnValidation, updateRentalReturn)

//router.delete("/rentals/:id", deleteRentalValidation, deleteRental)

export default router