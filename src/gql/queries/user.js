import connection from "../db/mysql.js";



export const getUserById = async function(Id) {
    const con = connection;
    console.log(Id);

    const [rows] = await con.execute('SELECT * FROM users WHERE id = ?', [Id]);
    console.log(rows);
    // await con.end();
    return rows ? rows[0] : [];
};