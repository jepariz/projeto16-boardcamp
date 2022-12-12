import { Router } from "express";
import { createRental } from "../controllers/rentalsControllers/createRental.controller.js";
import { rentalValidation } from "../middlewares/rentalValidation.middleware.js";

const router = Router();

//router.get("/rentals", listRentals)

router.post("/rentals", rentalValidation, createRental)

//router.post("/rentals/:id/return", returnValidation, createRentalReturn)

//router.delete("/rentals/:id", deleteRentalValidation, deleteRental)

export default router