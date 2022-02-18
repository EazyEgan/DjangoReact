import Timer from './Timer'
import ProgressBar from "./ProgressBar";
import ExerciseTutorial from "./ExerciseTutorial";

import React, {Component} from "react";

import CustomModal from "./Modal";
import axios from "axios"
import WorkoutTile from "./WorkoutTile";
import ExerciseRecapTile from "./ExerciseRecapTile";
import Input from "./Input";
import Button from "./Button";
import Cookies from "js-cookie"

export default class ExerciseTutorialContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseList: this.props.exerciseList,
            exerciseInProgress: false,
            currentExerciseIndex: 0,
            exitFunction: this.props.exitFunction,
            displayRecap: false,
            logList: [],
            logData: [],
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    getCookie() {
        const csrftoken = Cookies.get('csrftoken');
        return csrftoken
    }

    refreshList = () => {
        axios
            .get("/api/workouts/")
            .then((res) => this.setState({workoutList: res.data}))
            .catch((err) => console.log(err));
    };

    handleSubmit = (item) => {
        console.log(item)
        axios
            .post("/api/exercise_logs/", item,{
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken')
                }
            })
            .catch((err) => console.log(err));//notify new PBs

    };



    handleSubmitLogs = () => {
        const results = this.state.logList;

        results.map((result, index) => (
                this.handleSubmit(result.logItem)
            )
        )
        this.state.exitFunction()

    }

    handleLogData = (log_data) => {
        const logList = this.state.logList;
        this.setState({
            logList: logList.concat([
                {
                    logItem: log_data
                }
            ]),
        })
    }

    selectNextExercise = (max) => {
        if (this.state.exerciseList.length == this.state.currentExerciseIndex + 1) {
            this.setState({displayRecap: true})

        } else {
            this.setState({currentExerciseIndex: this.state.currentExerciseIndex + 1})
        }
    }

    renderExercise = () => {
        const currentExercise = this.state.exerciseList[this.state.currentExerciseIndex];
        return (
            <ExerciseTutorial
                exercise={currentExercise}
                selectNextExercise={this.selectNextExercise}
                handleLogData={this.handleLogData}
            />

        );
    };

    handleMaxChange = (value, index) => {
        this.state.logList[index].logItem.max = value //Direct change - bad practice?
    }



    renderExerciseRecapTiles = () => {
        const results = this.state.logList;
        return (
            results.map((result, index) => (
                    <div className='' >
                        <ExerciseRecapTile
                            key={result.exercise_id}
                            id={result.exercise_id}
                            label={result.title}
                            handleChange={e=>this.handleMaxChange(e.target.value, index)}
                            defaultData={result}
                        />
                    </div>
                )
            )
        );
    }

    renderExerciseRecap = () => {

        return (<div>
                {this.renderExerciseRecapTiles()}
                <Button
                    class={"button green"}
                    onClick={this.handleSubmitLogs}
                    label={"Save & Exit"}
                />
            </div>
        );
    }

    render() {
        const exIndex = this.state.currentExerciseIndex;
        let currentExerciseName = this.state.exerciseList[exIndex].title;
        return (
            <div>
                {this.state.displayRecap ?
                    <div><h2> Workout Recap: </h2>{this.renderExerciseRecap()}</div>


                    : <div>
                        <h2> Exercise {this.state.currentExerciseIndex + 1}/{this.state.exerciseList.length}: {currentExerciseName} </h2>{this.renderExercise()}
                    </div>}

            </div>
        );
    }
}
