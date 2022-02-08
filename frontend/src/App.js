import React, { Component } from "react";

import CustomModal from "./components/Modal";
import axios from "axios"
import List from "./components/List";

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

    handleSubmit = (item) => {

        /*if (item.id) {
            axios
                .put(`/api/workout_data/${item.id}/`, item)
                .then((res) => this.refreshList());
            return;
        }*/
        axios
            .post("/api/workout_data/", item)
            .then((res) => this.refreshList());
    };

    handleDelete = (item) => {
        axios
            .delete(`/api/workouts/${item.id}/`)
            .then((res) => this.refreshList());
    };



    viewItem = (item) => {
        this.setState({activeItem: item, modal: !this.state.modal});
    };


    renderNotes = () => {
        const newItems = this.state.workoutList;
        return (
                newItems.map(note => (
                <div className='' key={note.workout_type}>
                    <List
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
