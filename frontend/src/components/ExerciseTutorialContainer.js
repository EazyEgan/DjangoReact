import Timer from './Timer'
import ProgressBar from "./ProgressBar";
import ExerciseTutorial from "./ExerciseTutorial";

import React, {Component} from "react";

import CustomModal from "./Modal";
import axios from "axios"


export default class ExerciseTutorialContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseList: this.props.exerciseList,
            exerciseInProgress: false,
            currentExerciseIndex: 0,
            exitFunction:this.props.exitFunction,
            maxList: []
        };
    }

    componentDidMount() {
        this.refreshList();
    }
// Replace with data from App.js
    refreshList = () => {
        axios
            .get("/api/workouts/")
            .then((res) => this.setState({workoutList: res.data}))
            .catch((err) => console.log(err));
    };

    handleSubmit = (item) => {
        axios
            .post("/api/workout_data/", item)
            .then((res) => this.refreshList());//notify new PBs
    };

    selectNextExercise = (max) => {
        if (this.state.exerciseList.length  == this.state.currentExerciseIndex+1) {
            this.handleSubmit(this.state.maxList);
            this.state.exitFunction();
    }
        else{
            this.setState({currentExerciseIndex: this.state.currentExerciseIndex + 1, maxList: this.state.maxList.concat(max),})
        }
    }

    renderExercise = () => {
        const currentExercise = this.state.exerciseList[this.state.currentExerciseIndex];
        return (
            <ExerciseTutorial
                exercise={currentExercise}
                selectNextExercise={this.selectNextExercise}
            />

        );
    };

    render() {
        return (
            <div>
                <h2> Exercise {this.state.currentExerciseIndex+1}/{this.state.exerciseList.length} </h2>
                        {this.renderExercise()}
            </div>
        );
    }
}
