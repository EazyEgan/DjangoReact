import React, {Component} from "react";
import CountDown from './Countdown'
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import Input from "./Input";
import WorkoutTile from "./WorkoutTile";
import {ResponsiveLine} from "@nivo/line";
import axios from "axios"

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
            showGraph: false,
            currentRep: 1,
            currentSet: 1,
            completedReps: 0,
            completedSets: 0,
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
            logList: [],
            logData: [],


        };
    }

    toggleCountDown = () => {
        this.setState({countdownInProgress: !this.state.countdownInProgress})

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
            this.setState({completedSets: this.state.completedSets+1})
            this.handleExerciseComplete()
        } else if (this.state.isoInProgress && this.state.currentSet < this.state.sets) {
            this.setState({
                isoInProgress: false,
                exerciseInProgress: true,
                currentRep: 1,
                currentSet: this.state.currentSet + 1,
                completedSets: this.state.completedSets + 1,
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
            this.setState({currentRep: this.state.currentRep + 1,completedReps:this.state.completedReps+1})
        } else {
            this.setState({completedReps:this.state.completedReps+1})
            this.handleSetComplete()
        }
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

    getLogData = (time_param) => {
        axios
            .get("/api/exercise_logs/", {
                params: {
                    exercise_id: this.state.exercise.id,
                    param: time_param
                }
            })
            .then((res) => this.setState({logData: res.data})).then(console.log(this.state.logData))
            .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.getLogData('year')
        this.refreshList();
    }

    componentDidUpdate(prevProps) {
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
            }, () => {
                this.getLogData('year')
            })

        }
    }

    refreshList = () => {
        this.setState({exercise: this.props.exercise})
    };

    beginExercise = () => {
        this.setState({previewInProgress: false, introCountInProgress: true, logData: []})
    }

    renderExercisePreview = () => {
        return (
            <div className={"columns"}>

                <div className={"exerciseInfo"}>
                    <div>
                        <div id={"exerciseInfoChild"}><h2 className={"smallpadding"}>Target Areas: &nbsp;</h2></div>
                        <div id={"exerciseInfoChild"}><h2 className={"grey smallpadding"}> {this.state.area}</h2>
                        </div>
                    </div>
                    <div>
                        <div id={"exerciseInfoChild"}><h2 className={"smallpadding"}>Tips: &nbsp;</h2></div>
                        <div id={"exerciseInfoChild"}><h2 className={"grey smallpadding"}>{this.state.tips}</h2>
                        </div>
                    </div>
                    <div>
                        <div id={"exerciseInfoChild"}><h2 className={"smallpadding"}>Sets: &nbsp;</h2></div>
                        <div id={"exerciseInfoChild"}><h2 className={"grey smallpadding"}>{this.state.sets}</h2>
                        </div>
                    </div>
                    <div>
                        <div id={"exerciseInfoChild"}><h2 className={"smallpadding"}>Reps: &nbsp;</h2></div>
                        <div id={"exerciseInfoChild"}><h2 className={"grey smallpadding"}>{this.state.reps}</h2>
                        </div>
                    </div>
                    <div>
                        <div id={"exerciseInfoChild"}><h2 className={"smallpadding"}>Isometric Hold:  &nbsp;</h2>
                        </div>
                        <div id={"exerciseInfoChild"}><h2
                            className={"grey smallpadding"}>{this.state.iso_hold} seconds</h2></div>
                    </div>
                    <div>
                        <div id={"exerciseInfoChild"}><h2 className={"smallpadding"}>Current Max: &nbsp;</h2></div>
                        <div id={"exerciseInfoChild"}><h2 className={"grey smallpadding"}>{this.state.max}</h2>
                        </div>
                    </div>

                    <Button
                        class={"button green"}
                        onClick={this.beginExercise}
                        label={"Begin Workout"}
                    />
                </div>

                <div>

                    {this.state.logData && this.state.logData.length > 0 ?
                        <div><h2 className={"smallpadding"}> Previous Workout Data </h2>  {this.renderMaxGraph()}
                        </div>
                        : null
                    }

                </div>

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
    renderMaxGraph = () => {
        return (
            <div style={{height: 400}}>
                <ResponsiveLine
                    data={[
                        {
                            "id": "Personal Bests",
                            "color": "#92e5a1",
                            "data": this.state.logData
                        },

                    ]}
                    colors="#97E3D5"
                    margin={{top: 50, right: 110, bottom: 50, left: 60}}
                    xScale={{type: 'point'}}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: true,
                        reverse: false
                    }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Date',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Weight (lbs)',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    pointSize={10}
                    pointColor={{theme: 'background'}}
                    pointBorderWidth={2}
                    pointBorderColor={{from: 'serieColor'}}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        )
    }

    renderExerciseActive = () => {
        return (
            <div>
                <h2>
                    <div>Set: {this.state.currentSet}/{this.state.sets}</div>
                    <div>Rep: {this.state.currentRep}/{this.state.reps}</div>

                </h2>
                <ProgressBar seconds={3} barShrinking={false} handleRepComplete={this.handleRepComplete}/>
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
                <div className={"exerciseInfo"}>
                    <div>
                        <div id={"exerciseInfoChild"}><h2 className={"smallpadding"}>Completed Sets: &nbsp;</h2></div>
                        <div id={"exerciseInfoChild"}><h2
                            className={"grey smallpadding"}>{this.state.completedSets}/{this.state.sets}</h2></div>
                    </div>
                    <div>
                        <div id={"exerciseInfoChild"}><h2 className={"smallpadding"}>Completed Reps: &nbsp;</h2></div>
                        <div id={"exerciseInfoChild"}><h2
                            className={"grey smallpadding"}>{this.state.completedReps}/{this.state.reps * this.state.sets}</h2></div>
                    </div>
                    <div>
                        <div id={"exerciseInfoChild"}><h2 className={"smallpadding"}>Completed Isometric Hold
                            Time:  &nbsp;</h2></div>
                        <div id={"exerciseInfoChild"}><h2
                            className={"grey smallpadding"}>{this.state.iso_hold * (this.state.completedSets)}seconds</h2>
                        </div>
                    </div>
                    <div>
                        <div id={"exerciseInfoChild"}><h2 className={"smallpadding"}>Current Max: </h2></div>
                        <div id={"exerciseInfoChild"}><h2 className={"grey smallpadding"}>{this.state.max}</h2></div>
                    </div>
                </div>

                <div style={{display: "flex"}}>
                    <Input
                        outerClass={"button green fill"}
                        innerClass={"top nopadding-top fill"}
                        label={"Max: "}
                        inputTextType={"mediumtext"}
                        labelClass={"input-label-medium-bold"}
                        pattern={"[0-9]*"}
                        handleChange={this.handleMaxChange}
                        previousMax={this.state.maxForCurrentExercise}
                    /><h2 className={"nopadding"}> lbs </h2>

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
                                                    null
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

