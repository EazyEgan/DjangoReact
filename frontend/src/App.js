import React, {Component} from "react";
import "./style/base.css"
import CustomModal from "./components/Modal";
import axios from "axios"
import WorkoutTile from "./components/WorkoutTile";
import {ResponsiveCalendar} from "@nivo/calendar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutList: [],
            modal: false,
            activeItem: {
                title: "",
                areas: "",
                workout_type: "",
                exercises: [],
            },
            calendarData: [],
        };
    }

    componentDidMount() {
        this.refreshWorkoutList();

    }

    refreshWorkoutList = () => {
        console.log("refreshed workoutlist")
        axios
            .get("/api/workouts/")
            .then((res) => this.setState({workoutList: res.data}, () => {this.refreshCalendar()}))
            .catch((err) => console.log(err));
    };

    refreshCalendar = () => {
        console.log("refreshed calendar")
        console.log(this.state.workoutList)
        this.state.workoutList.forEach(workout =>
            this.getCalendarData(workout.id, 'year')
        );
    };

    getCalendarData = (id, time_param) => {
        console.log("getcalendar function")
        axios
            .get("/api/workout_log/", {
                params: {
                    workout: id,
                    param: time_param
                }
            })
            .then((res) => this.setState({calendarData: this.state.calendarData.concat(
res.data),}))
            .then(console.log(this.state.calendarData))
            .catch((err) => console.log(err));
    };

    toggle = () => {
        this.setState({modal: !this.state.modal});
    };


    viewItem = (item) => {
        this.setState({activeItem: item, modal: !this.state.modal});
    };

    handleLegend = (value) => {
        if (value == 1) {
            return 'Push'
        } else if (value == 2) {
            return 'Pull'
        } else if (value == 3) {
            return 'Legs'
        }

    }

    renderCalendar = () => {
        return (


            <ResponsiveCalendar
                data={this.state.calendarData}
                from="2022-01-01"
                to="2022-12-31"

                emptyColor="#eeeeee"
                colors={['#92e5a1', '#97e3d5', '#00ff41']}
                margin={{top: 40, right: 40, bottom: 40, left: 40}}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                tooltip={function (data) {

                    if (data.value === undefined) return null
                    return (
                        <span style={{color: data.color, backgroundColor: 'black', padding: '10px'}}>
                                        {data.day} :

                            {data.value == 1 ? ' Push' : null

                            }
                            {data.value == 2 ? ' Pull' : null

                            }
                            {data.value == 3 ? ' Legs' : null}

                            </span>
                    )
                }
                }

                legendFormat={value =>
                    this.handleLegend(value)
                }
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        translateY: -40,
                        translateX: -420,
                        itemCount: 2,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'left-to-right'
                    }
                ]}
            />
        )
    }

    renderTiles = () => {
        const newItems = this.state.workoutList;
        return (
            newItems.map(workout => (
                    <div className='tile' key={workout.workout_type}>
                        <WorkoutTile
                            key={workout.workout_type}
                            id={workout.workout_type}
                            title={workout.title}
                            areas={workout.areas}

                            onClick={() => this.viewItem(workout)}
                        />
                    </div>
                )
            )
        );
    };


    render() {
        return (
            <div className='App'>
                <div className='tile_container'>
                    {this.renderTiles()}
                </div>

                <div className="calendar_container">
                    <h2 class="nopadding">Workout History:</h2>
                    {this.renderCalendar()}
                </div>
                {this.state.modal ? (
                    <CustomModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </div>
        );
    }
}

export default App;
