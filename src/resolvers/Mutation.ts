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
            const existingUser=await users.findOne({name:Usuario.name,email:Usuario.email})

            if(existingUser){

                console.log("Ya existe este usuario")
                console.log(existingUser)
                return false

            }else{    
                let secure_code=secure_code_random()
                await users.insertOne({id:uuidv4(),email:Usuario.email,name:Usuario.name,password:Usuario.password,age:Usuario.age,secure_code:secure_code,statusAccount:"Disable"})
        
                transporter.sendMail(
                    {
                        from: "javier.perez.celada@gmail.com",
                        to: Usuario.email,
                        subject: "CREACIÓN USUARIO",
                        html: `<br>Te has registrado en la aplicacion con el nombre <b>${Usuario.name}</b></br> <br>Tu código de verificacion es: <b>${secure_code}</b></br>`
                    }
                )

                return true
                
            }
        }catch(e){
            throw 1
        }
    },   
    EnableAccount: async(parent:any, Usuario:User, ctx:any, info:any)=>{

        try{
            const client = await connectDB();
            const db: Db = client;
            const users=await db.collection<User>("Usuarios")
            const existingUser=await users.findOne({email:Usuario.email,password:Usuario.password})
            if(!existingUser){
                console.log("No existe este email o la contraseña es incorrecta")
                return false
            }else{
                if(existingUser.statusAccount=="Disable"){
                    if(existingUser.secure_code==Usuario.secure_code){
                        await users.updateOne({email:Usuario.email,password:Usuario.password},{$set:{statusAccount:"Able"}})
                        return true
                    }else{
                        console.log("El codigo introducido no es correcto")
                        return false
                    }
                }else{
                    console.log("Ya dispones de la cuenta habilitada")
                    return false
                }        
            }
            
        }catch(e){
            throw 1
        }
    }
}  


export {Mutation}