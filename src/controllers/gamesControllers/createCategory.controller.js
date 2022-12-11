import { connection } from "../../database/database.js";

export async function createCategory (req, res){

const category = res.locals.category.name

try{
    await connection.query("INSERT INTO categories (name) VALUES ($1)", [category]);

   return res.sendStatus(201)
} catch(err){
    return res.sendStatus(500)
}
}