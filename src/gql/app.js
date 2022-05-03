import express from 'express';
import {graphqlHTTP} from "express-graphql";
import {schema} from "./schema.js";
import {question} from "./queries/question.js";
import {createUser, getUserById} from "./queries/user.js";
import cors from 'cors';

const port = 3002;


const root = {
    getQuestion: function () {
        return question;
    },
    getQuestionsWithAnswers: function () {
        return question;
    },
    getUser: (args) => {
        const id = args.Id;
        return getUserById(id);
    },
    createUser: ({user}) => {
        return createUser(user);
    },
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));


app.listen(port);
console.log('GraphQL API server running at localhost: ' + port);