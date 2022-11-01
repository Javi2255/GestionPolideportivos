import { gql } from "apollo-server";

const typeDefs = gql`

type User{
    id: String!
    email: String!
    name: String!
    password: String!
    age: Int!
    secure_code: String!
    statusAccount: String!
}

type Query{
    GetAllUsers:[User!]
    DeleteAllUsers:Int!
    GetUser(email:String!):User!
    GetUserById(id:String!):User!
}
type Mutation{
    CreateUser(email:String!,name:String!,password:String!,age:String!):Int!  
    LogIn(email:String!,password:String!):Int!
    AbleAccount(id:String!,secure_code:String!):Int!
}
`
;

export {typeDefs}