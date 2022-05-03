import express from 'express';
import {graphqlHTTP} from "express-graphql";
import {schema} from "./schema.js";
import {question} from "./queries/question.js";
import {getUserById} from "./queries/user.js";
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
        const user = getUserById(id)
        return user;
    },
};

const app = express();
app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));


app.listen(port);
console.log('GraphQL API server running at localhost: ' + port);