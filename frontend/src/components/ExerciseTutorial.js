import React, {Component} from "react";
import CountDown from './Countdown'
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import Input from "./Input";
import WorkoutTile from "./WorkoutTile";


export default class ExerciseTutorial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercise: this.props.exercise,
            title: this.props.exercise.title,
            area: this.props.exercise.area,
            tips: this.props.exercise.tips,
            sets: this.props.exercise.sets,
            reps: this.props.exercise.reps,
            iso_hold: this.props.exercise.iso_hold,
            max: this.props.exercise.max,
            selectNextExercise: this.props.selectNextExercise,
            handleLogData: this.props.handleLogData,
            currentExerciseIndex: 0,
            previewInProgress: true,
            inputData: false,
            exerciseInProgress: false,
            countdownInProgress: false,
            introCountInProgress: true,
            isoInProgress: false,
            currentRep: 1,
            currentSet: 1,
            countdownLen: 4,
            maxForCurrentExercise: 0,
            logItem: {
                exercise_title: "",
                exercise_id: 0,
                sets: 0,
                completed_sets: 0,
                reps: 0,
                completed_reps: 0,
                max: 0,
            },
            logList: [
            ],


        };
    }

    renderProgressBar = () => {


    }

    renderCustomTimer = () => {


    }


    renderExerciseData = () => {


    }

    toggleCountDown = () => {
        this.setState({countdownInProgress: !this.state.countdownInProgress})

    }

    startExercise = () => {
        this.toggleCountDown()
        this.setState({exerciseInProgress: !this.state.exerciseInProgress, countdownLen: 4})
    }

    startCountDown = () => {
        this.toggleCountDown()

    }

    renderCountDown = () => {
        return (
            <div>
                <CountDown
                    seconds={this.state.countdownLen}
                    handleCountDownFinish={this.handleCountDownFinish}
                    countDownText={"Beginning in"}
                    finishText={"Begin!"}
                />
            </div>
        )
    }

    handleCountDownFinish = () => {
        if (this.state.introCountInProgress) {
            this.setState({introCountInProgress: false, exerciseInProgress: true})
        }
        if (this.state.isoInProgress && this.state.currentSet == this.state.sets) {
            this.handleExerciseComplete()
        } else if (this.state.isoInProgress && this.state.currentSet < this.state.sets) {
            this.setState({
                isoInProgress: false,
                exerciseInProgress: true,
                currentRep: 1,
                currentSet: this.state.currentSet + 1
            })
        } else {
            this.setState({introCountInProgress: false})
        }
    }

    handleSetComplete = () => {
        this.setState({exerciseInProgress: false, isoInProgress: true})
    }

    handleRepComplete = () => {
        if (this.state.currentRep != this.state.reps) {
            this.setState({currentRep: this.state.currentRep + 1})
        } else {
            this.handleSetComplete()
        }
    }

    handleIsoStart = () => {
        this.setState({isoInProgress: true, countdownInProgress: true, countdownLen: 7})

    }

    handleExerciseComplete = () => {
        this.setState({isoInProgress: false, inputData: true})

    }

    createLogData = () => {
        const newLogItem = {
            ...this.state.logItem, exercise_title: this.state.title,
            exercise_id: this.state.exercise.id,
            sets: this.state.sets,
            completed_sets: this.state.currentSet,
            reps: this.state.reps,
            completed_reps: this.state.currentRep,
            max: this.state.maxForCurrentExercise,
        };
        this.setState({logItem: newLogItem}, this.state.handleLogData(newLogItem));

    }

    handleNextExercise = () => {
        this.createLogData()

        this.setState({
            previewInProgress: true,
            countdownInProgress: false,
            isoInProgress: false,
            inputData: false,
            exerciseInProgress: false,
                    })
        this.state.selectNextExercise(this.state.maxForCurrentExercise)
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.exercise !== prevProps.exercise) {
            this.setState({
                exercise: this.props.exercise,
                title: this.props.exercise.title,
                area: this.props.exercise.area,
                tips: this.props.exercise.tips,
                sets: this.props.exercise.sets,
                reps: this.props.exercise.reps,
                iso_hold: this.props.exercise.iso_hold,
                max: this.props.exercise.max,
                selectNextExercise: this.props.selectNextExercise,
                inputData: false,
                exerciseInProgress: false,
                countdownInProgress: false,
                isoInProgress: false,
                currentRep: 1,
                currentSet: 1,
                countdownLen: 4,
                maxForCurrentExercise: 0,
            })
        }
    }

    refreshList = () => {
        this.setState({exercise: this.props.exercise})
    };

    beginExercise = () => {
        this.setState({previewInProgress: false, introCountInProgress: true})

    }

    renderExercisePreview = () => {
        return (
            <div>
                <h2>Target Areas:</h2><p className="bodytext">{this.state.area}</p>
                <h2>Tips:</h2><p className="bodytext">{this.state.tips}</p>
                <h2>Sets:</h2><p className="bodytext">{this.state.sets}</p>
                <h2>Reps:</h2><p className="bodytext">{this.state.reps}</p>
                <h2>Isometric Hold:</h2><p className="bodytext">{this.state.iso_hold}</p>
                <h2>Current Max:</h2><p className="bodytext">{this.state.max}</p>
                <Button
                    class={"button green"}
                    onClick={this.beginExercise}
                    label={"Begin Workout"}
                />


            </div>
        );
    }

    handleExerciseEarlyEnd = () => {
        this.setState({exerciseInProgress: false, countdownInProgress: false})
        this.handleExerciseComplete()

    }

    handleExerciseRetry = () => {
        this.setState({
            previewInProgress: true,
            inputData: false,
            introCountInProgress: true,
            exerciseInProgress: false,
            countdownInProgress: false,
            isoInProgress: false,
            currentRep: 1,
            currentSet: 1,
            countdownLen: 4,
            maxForCurrentExercise: 0,
        })

    }

    renderExerciseRecap = () => {
        const newItems = this.state.workoutList;
        return (
            newItems.map(note => (
                    <div className='' key={note.workout_type}>
                        <WorkoutTile
                            key={note.workout_type}
                            id={note.workout_type}
                            title={note.title}
                            areas={note.areas}

                            onClick={() => this.viewItem(note)}
                        />
                    </div>
                )
            )
        );

    }

    renderExerciseActive = () => {
        return (
            <div>
                <h2>
                    <div>Set: {this.state.currentSet}/{this.state.sets}</div>
                    <div>Rep: {this.state.currentRep}/{this.state.reps}</div>

                </h2>
                <ProgressBar seconds={2} barShrinking={false} handleRepComplete={this.handleRepComplete}/>
                <div style={{display: "flex"}}>
                    <div className="divright">
                        <Button
                            class={"button danger"} //one button at a time, no id needed for now
                            onClick={this.handleExerciseEarlyEnd}
                            label={"End Exercise"}
                        />
                    </div>
                </div>
            </div>
        );

    }


    handleMaxChange = (event) => {
        this.setState({maxForCurrentExercise: event.target.value});
    }

    renderExerciseComplete = () => {
        return (
            <div>

                <div>{this.state.currentRep}/{this.state.reps}</div>
                <div>{this.state.currentSet}/{this.state.sets}</div>


                <div style={{display: "flex"}}>
                    <Input
                        outerClass={"button green fill"}
                        innerClass={"top nopadding-top fill"}
                        label={"Max"}
                        inputTextType={"largetext"}
                        labelClass={"input-label-large"}
                        pattern={"[0-9]*"}
                        handleChange={this.handleMaxChange}
                        previousMax={this.state.maxForCurrentExercise}
                    />lbs

                    <div className={"divright"}>
                        <Button
                            class={"button green"}
                            onClick={this.handleNextExercise}
                            label={"Next Exercise"}
                        />
                        <Button
                            class={"button warning"} //one button at a time, no id needed for now
                            onClick={this.handleExerciseRetry}
                            label={"Retry Exercise?"}

                        />
                    </div>


                </div>
            </div>
        );

    }

    renderIntroCount = () => {
        return (
            <div>
                <CountDown
                    seconds={4}
                    handleCountDownFinish={this.handleCountDownFinish}
                    countDownText={"Beginning in"}
                    finishText={"Begin!"}
                />
            </div>
        )
    }

    renderIsoCount = () => {
        return (
            <div>

                <CountDown
                    seconds={8}
                    handleCountDownFinish={this.handleCountDownFinish}
                    countDownText={"Isometric Hold/Rest"}
                    finishText={"Done!"}
                />
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.previewInProgress ? this.renderExercisePreview() :
                    <div>
                        {this.state.introCountInProgress ? this.renderIntroCount() :
                            <div>
                                {this.state.exerciseInProgress ? this.renderExerciseActive() :
                                    <div>
                                        {this.state.isoInProgress ? this.renderIsoCount() :
                                            <div>
                                                {this.state.inputData ? this.renderExerciseComplete() :
                                                    ""
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        }</div>
                }
            </div>
        );
    }
}

