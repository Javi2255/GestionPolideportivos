import { Db, MongoClient } from "mongodb";
import { connectDB } from "../mongo";
import {User} from "../types"
import {transporter} from '../email'


//FUNCION PARA GENERAR CADENA DE 6 CARACTERES ALEATORIOS
function secure_code_random(){
    const letras= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let aleatoria = "";
    for (let i = 0; i < 6; i++) {
        aleatoria += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    return aleatoria
}

const Mutation = {

    CreateUser: async(parent:any, Usuario:User, ctx:any, info:any)=>{

        try{
            const { v4: uuidv4 } = require('uuid');
            const client = await connectDB();
            const db: Db = client;
            const users=await db.collection<User>("Usuarios")
            const existingUser=await users.findOne({email:Usuario.email})

            if(existingUser){
                return 1
            }else{    
                let id=uuidv4()
                let secure_code=secure_code_random()
                await users.insertOne({id:id,email:Usuario.email,name:Usuario.name,password:Usuario.password,age:Usuario.age,secure_code:secure_code,statusAccount:"Disable"})
                let urlRegistro=`http://localhost:3000/register/${id}`
                transporter.sendMail(
                    {
                        from: "javier.perez.celada@gmail.com",
                        to: Usuario.email,
                        subject: "CREACIÓN USUARIO",
                        html: `<br>Te has registrado en la aplicacion con el nombre <b>${Usuario.name}</b></br> <br>Tu código de verificacion es: <b>${secure_code}</b></br><br><a href=${urlRegistro}/>Pulse aquí para habilitar la cuenta</a></br>`
                    }
                )

                return 0
                
            }
        }catch(e){
            throw 1
        }
    },
    LogIn: async(parent:any, Usuario:User, ctx:any, info:any)=>{

        try{
            const client = await connectDB();
            const db: Db = client;
            const users=await db.collection<User>("Usuarios")
            const existingUser=await users.findOne({email:Usuario.email})
            if(!existingUser){
                return 1
            }else{
                if(existingUser.password==Usuario.password){
                    if(existingUser.statusAccount=="Disable"){
                        return 3
                    }else{
                        return 0
                    }  
                }else{
                    return 2
                }
            }
            
        }catch(e){
            throw 1
        }
    },
    AbleAccount: async(parent:any, Usuario:User, ctx:any, info:any)=>{

        try{
            const client = await connectDB();
            const db: Db = client;
            const users=await db.collection<User>("Usuarios")
            const existingUser=await users.findOne({id:Usuario.id})
            if(!existingUser){
                return 1
            }else{
                if(existingUser.secure_code==Usuario.secure_code){
                    await users.updateOne({id:Usuario.id},{$set:{statusAccount:"Able"}})
                    return 0
                }else{
                    return 2
                }
                
            }
            
        }catch(e){
            throw 1
        }
    }

}  


export {Mutation}















