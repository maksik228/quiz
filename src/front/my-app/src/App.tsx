import {Link} from "react-router-dom";
import style from './App.module.css';

function App() {
  return (
    <div className="App">
        <div className='main'>
            <Link to="theme" className={style.noDecoration}><div className={`${style.play} ${style.button}`}> Играть </div></Link>
            <Link to="login" className={style.noDecoration}><div className={`${style.logIn} ${style.button}`}> Войти </div></Link>
            <Link to="signup" className={style.noDecoration}><div className={`${style.signUp} ${style.button}`}> Зарегистрироваться </div></Link>
        </div>
    </div>
  );
}

export default App;
