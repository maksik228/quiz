import style from './game.module.css';
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {GameAnswer} from "./components/GameAnswer";

type question = {
                    answers: {
                        id:number;
                        text: string;
                        is_true:boolean
                    }[];
                    id: number;
                    text:string;
                    theme_id: number;
                };

const ALL_TIME:number = 20;

export const Game = () => {
    const location = useLocation();
    const [questions, setQuestions] = useState<question[]>([]);
    const [currenNumber, setCurrentNumber] = useState(0);
    const [counter, setCounter] = useState(ALL_TIME);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);


    const themeId = location.pathname.split('/')[2];
    // const wrongAnswerStyle = style.wrong;
    // const rightAnswerStyle = style.right;
    // const answerStyle = style.answerBlock;

    const loadQuestions = async () => {
        const q = `
                    query getActiveQuestionByThemeUser($theme_id: Int, $user_id: Int) {
              getActiveQuestionByThemeUser(theme_id:$theme_id, user_id: $user_id){
                id
                text
                theme_id
                answers{
                  id
                  text
                  is_true
                }
              }
            }`;
        const result = await fetch('http://localhost:3002/graphql',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: q,
                    variables: {
                        "theme_id": parseInt(themeId),
                        "user_id": 1
                    }
                })
            });
        const res_json = await result.json();
        console.log(res_json);
        return res_json;
    };

    if (questions.length === 0) {
        loadQuestions().then(res => setQuestions(res.data.getActiveQuestionByThemeUser))
        return (<div>Загружаем</div>); //прелоадер
    }


    return (
        <div className={style.main}>
            <div className={style.content}>
                <div className={style.questionBlock}>
                    <div className={style.question}>{questions[currenNumber]['text']}
                    </div>
                    <div className={style.timeBlock} id='time-block'>
                        <div className={style.time}>{counter}</div>
                    </div>
                </div>

                <div className={style.answers}>

                    {questions[currenNumber].answers.map((object) => <GameAnswer className={style.answerBlock}
                                                                                 textAnswer={object.text}
                                                                                 key={'answer_'+object.id}/>)}
                </div>

                <div className={style.buttons}>
                    <span>Продолжить</span>
                </div>
            </div>
        </div>
    );
}