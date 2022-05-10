import style from './gameAnswer.module.css';

type gameAnswerType =  {
    className: string;
    textAnswer: string;
}

export const GameAnswer = (props: gameAnswerType) => {

    return (
        <div className={props.className}>
            <p className={style.answer}>{props.textAnswer}</p>
        </div>
    );
}