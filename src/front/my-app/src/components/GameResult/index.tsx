import style from './gameresult.module.css';
import {useSelector} from "react-redux";

export const GameResult = () => {
    // @ts-ignore
    const count = useSelector((state) => state.counter.right);
    // @ts-ignore
    const all = useSelector((state) => state.counter.all);

    // // @ts-ignore
    // const user_id = useSelector((state) => state.user.id);
    // console.log(user_id);
    return (
        <div className={style.resultBlock}>
            <span className={style.result}>Ваш результат:</span>
            <span className={`${style.result} ${style.score}`}>{count}/{all}</span>
        </div>
    );
}