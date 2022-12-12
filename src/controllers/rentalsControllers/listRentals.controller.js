import { connection } from "../../database/database.js";


export async function listRentals (req, res){

    const customerId = req.query.customerId

    const gameId = req.query.gameId

    try{
        if(customerId){
            const filteredRentalsByCustomer = await connection.query(
                `SELECT * FROM rentals WHERE "customerId" ILIKE $1`, [customerId + "%"]
              );

            return res.send(filteredRentalsByCustomer.rows)
        }

        if(gameId){
            const filteredRentalsByGame = await connection.query(
                `SELECT * FROM rentals WHERE "gameId" ILIKE $1`, [gameId + "%"]
              );

            return res.send(filteredRentalsByGame.rows)
        }

        const rentals = await connection.query("SELECT * FROM rentals;")
        return res.send(rentals.rows)

    }catch (err){
        res.status(500).send(err.message);
    }

}