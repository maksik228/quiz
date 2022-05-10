import {Link} from "react-router-dom";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {toggleTask} from "./store/actions";

function App() {

    const dispatch = useDispatch();
    dispatch(toggleTask(11));
    const tasks = useSelector(state => state);
    console.log(tasks);

  return (
    <div className="App">
        <div><Link to="theme"> Играть </Link></div>
        <div><Link to="login"> Войти </Link></div>
        <div><Link to="signup"> Зарегистрироваться </Link></div>
    </div>
  );
}

export default App;
