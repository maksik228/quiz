import style from './game.module.css';
import {useLocation} from "react-router-dom";

export const Game = () => {
    const location = useLocation();

    console.log(location);
    const  id  = location.pathname.split('/')[2];
    return (
        <div>
            {id}
        </div>
    );
}