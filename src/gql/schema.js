import {buildSchema} from "graphql";
export const schema = buildSchema(`

       type Answer {
        ID: Int
        text: String
        isRight: Boolean
       }
       
      type Question {
        ID: Int
        question: String
        answers: [Answer]
       }
       
      type Query {
        getQuestion: [Question]
        getQuestionsWithAnswers: [Question]
      }
`);