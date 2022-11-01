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
    GetUser: async(parent:any, Usuario:User, ctx:any, info:any)=>{

        try{
            const client = await connectDB();
            const db: Db = client;
            const users=await db.collection<User>("Usuarios")
            const usuario=await users.findOne({email:Usuario.email})
            if(!usuario){
                return undefined
            }else{
                return usuario
            }
        }catch(e){
            throw 1
        }
    },
    GetUserById: async(parent:any, Usuario:any, ctx:any, info:any)=>{

        try{
            const client = await connectDB();
            const db: Db = client;
            const users=await db.collection<User>("Usuarios")
            const usuario=await users.findOne({id:Usuario.id})
            if(!usuario){
                return undefined
            }else{
                return usuario
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
            return 0;

        }catch(e){
            throw 1
        }
    }
    
}  


export {Query}