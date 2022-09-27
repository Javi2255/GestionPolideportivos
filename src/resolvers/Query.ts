import { Db, MongoClient } from "mongodb";
import { connectDB } from "../mongo";

const Query = {

    Hola: async(parent:any, {}:any, ctx:any, info:any)=>{

        try{
            const client = await connectDB();
            const db: Db = client;
            return false;

        }catch(e){
            throw 1
        }
    } 
}  


export {Query}