import '../style/base.css';
import React, {useState} from 'react'
function WorkoutTile(props) {


    return (

        <div className="note">
                <a href="#" className="button green"
                   onClick={props.onClick}>
                    <div className="bottom square-bottom"></div>
                    <div className="top square-top">
                        <div className="label"><h1> {props.title} </h1>
                            <p> Areas: {props.areas}</p></div>
                        <div className="button-border button-border-left"></div>
                        <div className="button-border button-border-top"></div>
                        <div className="button-border button-border-right"></div>
                        <div className="button-border button-border-bottom"></div>
                    </div>
                </a>
        </div>
    )
}

export default WorkoutTile;
