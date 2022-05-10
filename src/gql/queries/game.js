import connection from '../db/mysql.js';

export const addStats = async (args) => {
    const con = connection;
    const stats = args.stats;
    const user_id = stats[0].user_id;
    let str = '';

    let q = 'INSERT INTO games (user_id) value (?)';
    const [res] = await con.execute(q,[user_id]);
    const game_id = res.insertId;
    for (let stat of stats) {
        if (str !== '') str += ','
        str += '(' + game_id + ',' + stat.question_id + ',' + stat.answer_id + ')';
    }
    q = 'INSERT INTO game_statistics (game_id,question_id,answer_id) values ' + str ;
    const [res1] = await con.execute(q);
    return true;
}
