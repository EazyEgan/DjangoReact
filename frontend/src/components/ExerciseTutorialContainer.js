import ExerciseTutorial from "./ExerciseTutorial";
import React, {Component} from "react";
import axios from "axios"
import ExerciseRecapTile from "./ExerciseRecapTile";
import Button from "./Button";
import Cookies from "js-cookie"

export default class ExerciseTutorialContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseList: this.props.exerciseList,
            workoutId: this.props.workoutId,
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

    handleSubmit = (item, destination) => {
        console.log(item)
        axios
            .post(destination, item, {
                headers: {
                    'X-CSRFToken': this.getCookie()
                }
            })
            .catch((err) => console.log(err));//notify new PBs

    };



    handleSubmitLogs = async () => {
        await this.handleSubmit({'workout': this.state.workoutId}, "/api/workout_log/")
        const results = this.state.logList;
        results.map((result, index) => (
                this.handleSubmit(result.logItem, "/api/exercise_logs/")
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

    selectNextExercise = () => {
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
                workoutId={this.state.workoutId}
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
