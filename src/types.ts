const {v4: uuidv4} = require('uuid');

export interface User{
    id: String
    email: String
    name: String
    password: String
    age: number
    secure_code: String
    statusAccount: String
}