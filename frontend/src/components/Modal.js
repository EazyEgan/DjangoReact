import React, {Component} from "react";
import Timer from './Countdown'
import '../style/base.css';
import '../style/modal.css';

import ExerciseTutorialContainer from "./ExerciseTutorialContainer";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

            activeItem: this.props.activeItem,
            workoutStart: false,
        };
    }

    handleChange = (e) => {
        let {name, value} = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        const activeItem = {...this.state.activeItem, [name]: value};
        this.setState({activeItem});
    };


    render() {
        const {toggle, onSave} = this.props;
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={toggle}>&times;</span>
                        <ExerciseTutorialContainer
                            workoutId = {this.state.activeItem.id}
                        exerciseList = {this.state.activeItem.exercises}
                        exitFunction = {toggle}
                        />
                </div>
            </div>
        );
    }
}
