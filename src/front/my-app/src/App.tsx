import {Link} from "react-router-dom";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {postAdded} from "./store/reducer";

function App() {

    const dispatch = useDispatch();
    dispatch(
        postAdded({
            id: 1,
            title: 'dddddd',
            content: 'dddddddddddd',
        })
    )
    // @ts-ignore
    const posts = useSelector((state) => state.posts);
    console.log(posts);

  return (
    <div className="App">
        <div><Link to="theme"> Играть </Link></div>
        <div><Link to="login"> Войти </Link></div>
        <div><Link to="signup"> Зарегистрироваться </Link></div>
    </div>
  );
}

export default App;
