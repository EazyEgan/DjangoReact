import React, { Component } from "react";


import '../style/base.css';
import '../style/modal.css';

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const activeItem = { ...this.state.activeItem, [name]: value };

        this.setState({ activeItem });
    };
    handleClick = (e) => {


    }

    render() {
        const { toggle, onSave } = this.props;

        return (
            <div id="myModal" class="modal">


                <div class="modal-content">
                    <h2>{this.state.activeItem.title}</h2>
                    <p class="bodytext">{this.state.activeItem.areas}</p>

                </div>

            </div>



        );
    }
}
