import style from './gameresult.module.css';

export const GameResult = () => {
    return (
        <div className={style.resultBlock}>
            <span className={style.result}>Ваш результат:</span>
            <span className={`${style.result} ${style.score}`}>4/4</span>
        </div>
    );
}