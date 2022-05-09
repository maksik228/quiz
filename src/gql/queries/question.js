import connection from "../db/mysql.js";

export const  getQuestionWithAnswersByThemeAndUser = async (theme_id,user_id) => {
    const con = connection;
    const [res] = await con.execute(`select
                q.id as question_id,
                q.text as question_text,
                q.theme_id,
                a.id as answer_id,
                a.text as answer_text,
                a.is_true
        from questions q
                          join answers a on q.id = a.question_id
                          left join game_statistics gs on q.id = gs.question_id
                          left join games g on gs.game_id = g.id
        where q.theme_id = ? and (g.user_id <> ? OR g.user_id is null)
        order by question_id,RAND()`,[theme_id,user_id]);
    let result = [];
    let number_question = 0;
    let q_id = 0;
    for (let row of res){
        if (row.question_id != q_id) {
            if (result.length != 0) {number_question++}
            result[number_question] = {
                id: row.question_id,
                text: row.question_text,
                theme_id: row.theme_id,
                answers: [
                    {
                        id: row.answer_id,
                        text: row.answer_text,
                        is_true: row.is_true,
                    }
                ]
            }
            q_id = row.question_id;
        } else {
            result[number_question].answers.push({
                id: row.answer_id,
                text: row.answer_text,
                is_true: row.is_true,
            });
        }
    }
    // console.log(result);
    // console.log(result[0]);
    // console.log(result[1]);
    // console.log(result[2]);
    return result;
}
