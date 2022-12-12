import { connection } from "../database/database.js";
import { rentalSchema } from "../models/rentals.model.js";
import dayjs from "dayjs";


export async function rentalValidation(req, res, next) {
   const {customerId, gameId, daysRented} = req.body;

    let rental; 

    try {

        const gamePrice = await connection.query("SELECT * FROM games WHERE id=$1", [gameId])
        
        const rentPrice = daysRented * gamePrice.rows[0].pricePerDay;
        
        const customerExists = await connection.query(
            "SELECT * FROM customers WHERE id = $1::numeric",
            [customerId]
          );
          
          if (customerExists.rowCount === 0) {
            return res.sendStatus(400);
          }
          
          const gameExists = await connection.query(
            "SELECT * FROM games WHERE id= $1::numeric",
            [gameId]
          );
          
          if (gameExists.rowCount === 0) {
            return res.sendStatus(400);
          }
         
          const activeRentals = await connection.query(`SELECT * FROM rentals 
          WHERE "gameId" = $1 AND "returnDate" IS NULL;`, [gameId])

          const gameStock = await connection.query(`SELECT "stockTotal" FROM games WHERE id=$1;`, [gameId])

          if(activeRentals.rowCount > (gameStock.rows[0].stockTotal - 1)){
            return res.status(400).send("Todos os exemplares desse jogo estão alugados");
          }
  
      const { error } = rentalSchema.validate(req.body, { abortEarly: false });
  
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
      }


      rental = {
        customerId: customerId,
        gameId: gameId,
        rentDate: dayjs().format("YYYY-MM-DD"),
        daysRented: daysRented,
        returnDate: null,
        originalPrice: rentPrice,
        delayFee: null
    }

    } catch (err) {
       return res.status(500).send(`erro: ${err.message}`);
    }
  
    res.locals = rental;
    next();
  }
  