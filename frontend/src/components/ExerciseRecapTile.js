import '../style/base.css';
import React, {useState} from 'react'
import Input from "./Input";

function ExerciseRecapTile(props) {

    return (
        <div key={props.defaultData.logItem.exercise_id}>
            <h2>{props.defaultData.logItem.exercise_title}</h2>
            <p className="bodytext">{props.defaultData.logItem.completed_sets}/{props.defaultData.logItem.sets}</p>
            <p className="bodytext">{props.defaultData.logItem.completed_reps}/{props.defaultData.logItem.reps}</p>
            <Input
                outerClass={"button green "}
                innerClass={"top nopadding-top "}
                label={"Max"}
                inputTextType={"smalltext"}
                labelClass={"input-label-small"}
                handleChange={props.handleChange}
                pattern={"[0-9]*"}
                previousMax={props.defaultData.logItem.max}
            />lbs
        </div>
    )
}

export default ExerciseRecapTile;
