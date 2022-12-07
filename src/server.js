import express from "express";
import gamesRoutes from "./routes/games.routes.js"

const app = express();
app.use(express.json());
app.use(gamesRoutes)


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));