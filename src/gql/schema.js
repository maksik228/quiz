import {buildSchema} from "graphql";
export const schema = buildSchema(`
      type Question {
        ID: Int
        question: String
       }
       
      type Query {
        getQuestion: [Question]
      }
`);