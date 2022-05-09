import React, {useState} from 'react';
import style from './theme.module.css';

export const Theme = () => {
    const [themes, setThemes] = useState([]);
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


    return (
        <div className={style.wrapper}>
            <div>
                {themes.length}
            </div>
            <div>
                игра 2
            </div>
        </div>
    );
}