import express from 'express';
import {graphqlHTTP} from "express-graphql";
import {schema} from "./schema.js";
import {getQuestionWithAnswersByThemeAndUser} from "./queries/question.js";
import {createUser, getUserById, isUserExist} from "./queries/user.js";
import cors from 'cors';
import {getAllThemes} from "./queries/theme.js";

const port = 3002;


const root = {
    getActiveQuestionByThemeUser: function (args) {
        return getQuestionWithAnswersByThemeAndUser(args.theme_id, args.user_id);
    },
    getUser: (args) => {
        const id = args.Id;
        return getUserById(id);
    },
    createUser: ({user}) => {
        return createUser(user);
    },
    isUserExist: ({user}) => {
        return isUserExist(user);
    },
    getAllThemes: () => {
        return getAllThemes();
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