import React, {useState} from 'react';
import style from './loginForm.module.css';

export const LoginForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const { login, pass } = document.forms[0];
        if (!login.value || !pass.value) {
            setErrorMessage('Поля пустые');
        } else {
            setErrorMessage('');
            const q = `
                    query isUser($user: UserLogin) {
                                isUserExist(user:$user)
                            }`;
            const result = await fetch('http://localhost:3002/graphql',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: q,
                        variables: {
                            "user": {
                                "login": login.value,
                                "password": pass.value
                            }
                        }
                    })
                });
            const res_json = await result.json();
            if (res_json.data.isUserExist){
                alert('вы зашли');
            } else {
                setErrorMessage('Неправильный логин или пароль');
            }
        }
    };
    return (
        <div className={style.wrapper}>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Логин</p>
                    <input type="text" name="login"/>
                </label>
                <label>
                    <p>Пароль</p>
                    <input type="password" name="pass"/>
                </label>
                <div >
                    <button type="submit">Войти</button>
                </div>
                {errorMessage && <div className={style.errorMsg}>{errorMessage}</div>}
            </form>
        </div>
    );
}