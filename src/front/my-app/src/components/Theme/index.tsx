import React, {useState} from 'react';
import style from './theme.module.css';
import {Choice} from "./components/Choice";
import type {choiceType} from "./components/Choice";
import {useSelector} from "react-redux";

export const Theme = () => {
    const [themes, setThemes] = useState<choiceType[]>([]);
    const [isLoad, setIsLoad] = useState(false);
    const loadThemes = async () => {
        const q = `
                    {
                      getAllThemes {
                        id
                        name
                      }
                    }`;
        const result = await fetch('http://localhost:3002/graphql',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: q,
                    variables: {}
                })
            });
        const res_json = await result.json();
        setIsLoad(true);
        return res_json.data.getAllThemes;
     };
    if (!isLoad) {
        loadThemes().then(function(res){
            setThemes(res);
        });
    }
    // @ts-ignore
    const user_id = useSelector((state) => state.user.id);
    if (!user_id) {
        return (<div>Вы не авторизованы</div>)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.title}>Выберете тему</div>
            <div className={style.themeContainer}>
                {themes.map((object) => <Choice  id={object.id} name={object.name} key={object.id}/>)}
            </div>
        </div>
    );
}