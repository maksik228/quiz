import style from './game.module.css';
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {increment, resetRight, setAll} from "../../store/reducer";

type question = {
    answers: {
        id: number;
        text: string;
        is_true: boolean
    }[];
    id: number;
    text: string;
    theme_id: number;
};

type resultType = {
    user_id: number,
    question_id: number,
    answer_id: number,
};

const ALL_TIME: number = 15;
const USER_ID = 1;

export const Game = () => {
    const location = useLocation();
    const [questions, setQuestions] = useState<question[]>([]);
    const [currenNumber, setCurrentNumber] = useState(0);
    const [isChose, setIsChose] = useState(false);
    const [counter, setCounter] = useState(ALL_TIME);
    const [countRight, setCountRight] = useState(0);
    const [resultStats, setResultStats] = useState<resultType[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        if (counter == 0) {
            TimesHasGone()
        }
        !isChose && counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);


    const themeId = location.pathname.split('/')[2];

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
                        "user_id": USER_ID
                    }
                })
            });
        const res_json = await result.json();
        console.log(res_json);
        return res_json;
    };

    if (questions.length === 0) {
        loadQuestions().then(res => setQuestions(res.data.getActiveQuestionByThemeUser))
        dispatch(resetRight()); //счётчик в ноль
        return (<div>Загружаем</div>); //прелоадер
    }

    const findRightAnswer = (): number => {
        for (let answer of questions[currenNumber].answers) {
            if (answer.is_true) {
                return answer.id;
            }
        }
        return 0;
    }

    const answerClick = (event: React.SyntheticEvent) => {
        if (isChose) return;
        const chosenId = parseInt(event.currentTarget.id);
        const rightAnswer = findRightAnswer();
        if (rightAnswer == chosenId) {
            const el = document.getElementById(String(rightAnswer));
            if (el) el.classList.add(style.answerBlockRight);
            dispatch(increment());
            setCountRight(countRight + 1);
        } else {
            const elRight = document.getElementById(String(rightAnswer));
            const elWrong = document.getElementById(String(chosenId));
            if (elRight && elWrong) {
                elRight.classList.add(style.answerBlockRight);
                elWrong.classList.add(style.answerBlockWrong);
            }
        }
        setResultStats([...resultStats, {
            user_id: USER_ID,
            question_id: questions[currenNumber].id,
            answer_id: chosenId,
        }])

        setIsChose(true);
    }

    const TimesHasGone = () => {
        setResultStats([...resultStats, {
            user_id: USER_ID,
            question_id: questions[currenNumber].id,
            answer_id: 0,
        }])
        const rightAnswer = findRightAnswer();
        const el = document.getElementById(String(rightAnswer));
        if (el) el.classList.add(style.answerBlockRight);
        setIsChose(true);
    }

    const nextQuestion = () => {

        if (isChose || (counter == 0)) {
            if (questions.length == (currenNumber + 1)) {
                dispatch(setAll(questions.length));
                navigate("/game/result/");
            }
            setCurrentNumber(currenNumber + 1);
            setIsChose(false);
            setCounter(ALL_TIME);
        }
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

                    {questions[currenNumber].answers.map((object) => {
                        return (<div className={style.answerBlock} key={'answer_' + object.id}
                                     id={object.id.toString()}
                                     onClick={(e) => answerClick(e,)}>
                            <p className={style.answer}>{object.text}</p>
                        </div>);
                    })}
                </div>

                <div className={style.buttons} onClick={() => {
                    nextQuestion()
                }}>
                    <span>Продолжить</span>
                </div>
            </div>
        </div>
    );
}