import connection from "../db/mysql.js";

export const getAllThemes = async function() {
    const con = connection;
    const [res] = await con.execute("SELECT * FROM themes");
    return res;
}