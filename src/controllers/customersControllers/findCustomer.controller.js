import { connection } from "../../database/database.js";

export async function findCustomer (req, res){

const {id} = req.params

try{

const customerExists = await connection.query("SELECT * FROM customers WHERE id=$1", [id])

if(customerExists.rowCount > 0){
    return res.send(customerExists.rows)
} else{
    return res.status(404).send("Este cliente não existe")
}

}catch (err){
    return res.status(500).send(err.message);
}





}