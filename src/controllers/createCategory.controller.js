import { connection } from "../database/database.js";

export async function createCategory (req, res){

const category = res.locals.category.name


await connection.query("INSERT INTO categories (name) VALUES ($1)", [category]);

res.sendStatus(201)
}