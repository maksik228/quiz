import {Link} from "react-router-dom";
import './App.css';

function App() {

  return (
    <div className="App">
        <div><Link to="theme"> Играть </Link></div>
        <div><Link to="login"> Войти </Link></div>
        <div><Link to="signup"> Зарегистрироваться </Link></div>
    </div>
  );
}

export default App;
