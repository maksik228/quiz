import connection from "../db/mysql.js";
import passwordHash from "password-hash";



export const getUserById = async function(Id) {
    const con = connection;
    console.log(Id);

    const [rows] = await con.execute('SELECT * FROM users WHERE id = ?', [Id]);
    console.log(rows);
    // await con.end();
    return rows ? rows[0] : [];
};

export const createUser = async function(user) {
    const con = connection;
    const hash =  passwordHash.generate(user.password);
    const res = await con.execute('INSERT INTO users (login,password,email) value (?,?,?)', [user.login, hash, user.email]);
    // await con.end();
    return res;
}