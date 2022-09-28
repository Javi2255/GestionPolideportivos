import { Db, MongoClient } from "mongodb";
import { connectDB } from "../mongo";
import {User} from '../types'

const Query = {

    GetAllUsers: async(parent:any, {}:any, ctx:any, info:any)=>{

        try{
            const client = await connectDB();
            const db: Db = client;
            const users=await db.collection<User>("Usuarios")
            const usuarios=await users.find().toArray()
            if(usuarios.length==0){
                return undefined
            }else{
                return usuarios
            }
        }catch(e){
            throw 1
        }
    },
    DeleteAllUsers: async(parent:any, {}:any, ctx:any, info:any)=>{

        try{
            const client = await connectDB();
            const db: Db = client;
            const users=await db.collection<User>("Usuarios")
            await users.deleteMany({})
            return true;

        }catch(e){
            throw 1
        }
    } 
}  


export {Query}