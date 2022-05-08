import style from './login.module.css';
import {LoginForm} from "./components/LoginForm";
import {Link} from "react-router-dom";

export const Login = () => {
    return (
        <div className={style.wrapperForm}>
            <LoginForm/>
            <div className={style.wrapperBack}><Link to=""> На главную </Link></div>
        </div>
    );
}