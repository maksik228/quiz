import style from './signup.module.css';
import {SignupForm} from "./components/SignupForm";
import {Link} from "react-router-dom";

export const Signup = () => {
    return (
        <div className={style.wrapperForm}>
            <SignupForm/>
            <div className={style.wrapperBack}><Link to="/login"> Войти </Link></div>
            <div className={style.wrapperBack}><Link to="/"> На главную </Link></div>
        </div>
    );
}