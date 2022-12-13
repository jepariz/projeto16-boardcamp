import express from "express";
import gamesRoutes from "./routes/games.routes.js"
import customerRoutes from "./routes/customers.routes.js"
import rentalRoutes from "./routes/rentals.routes.js"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(gamesRoutes)
app.use(customerRoutes)
app.use(rentalRoutes)


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));