import React, {Component} from "react";

import CustomModal from "./components/Modal";
import axios from "axios"
import WorkoutTile from "./components/WorkoutTile";
import {Line} from '@nivo/line'

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
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("/api/workouts/")
            .then((res) => this.setState({workoutList: res.data}))
            .catch((err) => console.log(err));
    };

    toggle = () => {
        this.setState({modal: !this.state.modal});
    };


    viewItem = (item) => {
        this.setState({activeItem: item, modal: !this.state.modal});
    };


    renderNotes = () => {
        const newItems = this.state.workoutList;
        return (
            newItems.map(workout => (
                    <div className='' key={workout.workout_type}>
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
                <div id='container'>
                    {this.renderNotes()}


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
