import { connection } from "../../database/database.js";


export async function listGames (req, res){

    const name = req.query.name

    console.log(name)

    try{
        if(name){
            const filteredGame = await connection.query(
                `SELECT * FROM games WHERE name ILIKE $1`, [name + "%"]
              );

            return res.send(filteredGame.rows)
        }

        const games = await connection.query("SELECT * FROM games;")
        return res.send(games.rows)

    }catch (err){
        res.status(500).send(err.message);
    }

}