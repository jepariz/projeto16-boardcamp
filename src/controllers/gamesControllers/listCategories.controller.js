import { connection } from "../../database/database.js";

export async function listCategories (req, res){

    try{
        const categories = await connection.query("SELECT * FROM categories;")
        return res.send(categories.rows)

    }catch (err){
        res.status(500).send(err.message);
    }

}