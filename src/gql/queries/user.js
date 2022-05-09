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
    const [res] = await con.execute('INSERT INTO users (login,password,email) value (?,?,?)', [user.login, hash, user.email]);
    if (res?.insertId) {
        return res.insertId;
    } else {
        return 0
    }
}

export const isUserExist = async function(user) {
    const con = connection;
    const [res] = await con.execute('SELECT * FROM users WHERE login=?', [user.login]);
    if (res.length) {
        const row = res[0];
        return passwordHash.verify(user.password,row.password);
    }
    return false;
}