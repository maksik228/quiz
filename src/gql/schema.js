import {buildSchema} from "graphql";
export const schema = buildSchema(`
       scalar Date

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
       
      type User {
        ID: Int
        login: String,
        password: String,
        email: String,
        dt: Date,
       }
       
      type Query {
        getQuestion: [Question]
        getQuestionsWithAnswers: [Question]
        getUser(Id: Int): User
      }
      
      # Входной тип создания юзера
      input UserInput{
        login: String,
        password: String,
        email: String,
      }
    

    # Тут определяем все мутации
      type Mutation{
        createUser(user: UserInput!):String
      }
`);