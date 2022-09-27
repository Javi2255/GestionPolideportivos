import { Db, MongoClient } from "mongodb";
import { connectDB } from "../mongo";

const Mutation = {

    Hola: async(parent:any, {}:any, ctx:any, info:any)=>{

        try{
            const client = await connectDB();
            const db: Db = client;
            return true;

        }catch(e){
            throw 1
        }
    } 
}  


export {Mutation}