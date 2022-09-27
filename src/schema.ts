import { gql } from "apollo-server";

const typeDefs = gql`

type Query{
    Hola:String!
}
type Mutation{
    Hola:String!
}
`
;

export {typeDefs}