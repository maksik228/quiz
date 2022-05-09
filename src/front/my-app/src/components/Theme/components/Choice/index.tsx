import React from 'react';
import style from './choice.module.css';
import {Link} from "react-router-dom";

export type choiceType = {
    id: number
    name: string
}
export const Choice = (props: choiceType) => {
    return (
        <div className={style.choice}>
            <Link to = {`/game/${props.id}`}> {props.name} </Link>
        </div>
    );
}