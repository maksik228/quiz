import React, {useState} from 'react';
import style from './signupForm.module.css';

export const SignupForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const { login, email,  pass } = document.forms[0];
        if (!login.value || !email.value ||!pass.value) {
            setErrorMessage('Поля пустые');
        } else if(!regex.test(email.value)) {
            setErrorMessage('Плохой email');
        } else {
            setErrorMessage('');
            const q = `
                    mutation CreateNewUser($user: UserInput!) {
                      createUser(user: $user)
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
                                "password": pass.value,
                                "email": email.value
                            }
                        }
                    })
                });
            const res_json = await result.json();
            console.log(res_json);
            if (res_json?.data?.createUser){
                alert('Вы авторизованы');
            } else {
                setErrorMessage('Такой логин уже есть');
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
                    <p>email</p>
                    <input type="email" name="email" />
                </label>
                <label>
                    <p>Пароль</p>
                    <input type="password" name="pass"/>
                </label>
                <div >
                    <button type="submit">Зарегистрироваться</button>
                </div>
                {errorMessage && <div className={style.errorMsg}>{errorMessage}</div>}
            </form>
        </div>
    );
}