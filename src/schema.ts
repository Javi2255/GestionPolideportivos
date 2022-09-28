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
    DeleteAllUsers:Boolean!
}
type Mutation{
    CreateUser(email:String!,name:String!,password:String!,age:Int!):Boolean!  
    EnableAccount(email:String!,password:String!,secure_code:String!):Boolean!
}
`
;

export {typeDefs}