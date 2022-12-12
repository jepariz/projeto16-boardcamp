import { connection } from "../../database/database.js";


export async function listGames (req, res){

    const gameName = req.query.name

    try{
        if(gameName){
            const filteredGame = await connection.query(
                `SELECT games.*, categories.name AS "categoryName" 
                FROM games
                JOIN categories ON games."categoryId" = categories.id
                WHERE games.name ILIKE $1`, [gameName + "%"]
              );

            return res.send(filteredGame.rows)
        }

        const games = await connection.query(`SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;`)
        return res.send(games.rows)

    }catch (err){
        res.status(500).send(err.message);
    }

}