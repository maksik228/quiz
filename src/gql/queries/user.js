import connection from "../db/mysql.js";
import passwordHash from "password-hash";
import jwt from "jsonwebtoken";
import 'dotenv/config';

export const getUserById = async function(Id) {
    const con = connection;
    const [rows] = await con.execute('SELECT * FROM users WHERE id = ?', [Id]);
    console.log(rows);
    // await con.end();
    return rows ? rows[0] : [];
};

export const createUser = async function(user) {
    const con = connection;
    const hash =  passwordHash.generate(user.password);
    const [res] = await con.execute('INSERT INTO users (login,password,email) value (?,?,?)', [user.login, hash, user.email]);
    if (res?.insertId) {
        return res.insertId;
    } else {
        return 0
    }
}

export const checkToken = async function(token) {
    try {
        const decode = jwt.verify(token,process.env.SECRET_TOKEN);
        if (decode.id) {
            return {status: false, id: decode.id, token: token};
        } else {
            return {status: true, id: 0, token: ''};
        }
    } catch (e) {
        return {status: false, id: 0, token: ''};
    }
}

export const isUserExist = async function(user) {
    const con = connection;
    const [res] = await con.execute('SELECT * FROM users WHERE login=?', [user.login]);
    if (res.length) {
        const row = res[0];
        if (passwordHash.verify(user.password,row.password)){
            const token = createToken(row.id);
            return {status: true, id: row.id, token: token};
        } else {
            return {status: false, id: 0, token: ''};
        }
    }
    return {status: false, id: 0, token: ''};
}

const  createToken = function (user_id) {
    return jwt.sign({id: user_id}, process.env.SECRET_TOKEN, {expiresIn: "24h"});
}