import express from 'express';
import {graphqlHTTP} from "express-graphql";
import {schema} from "./schema.js";
import {question} from "./queries/question.js";
const port = 3002;


const root = {
    getQuestion: function () {
        return question;
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