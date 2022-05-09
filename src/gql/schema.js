import {buildSchema} from "graphql";
export const schema = buildSchema(`
       scalar Date

       type Answer {
        id: Int
        text: String
        is_true: Boolean
       }
       
       type Theme {
        id: Int
        name: String
       }
       
      type Question {
        id: Int
        text: String
        theme_id: Int
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
        getActiveQuestionByThemeUser(theme_id: Int, user_id: Int): [Question]
        getUser(Id: Int): User
        getAllThemes: [Theme]
        isUserExist(user: UserLogin): Boolean
      }
      
      # Входной тип создания юзера
      input UserInput{
        login: String,
        password: String,
        email: String,
      }
      
      # Входной тип логина юзера
      input UserLogin{
        login: String,
        password: String,
      }
    

    # Тут определяем все мутации
      type Mutation{
        createUser(user: UserInput!):Int
      }
`);