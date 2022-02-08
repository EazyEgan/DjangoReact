import React, { Component } from 'react'
import '../style/base.css'

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: this.props.class,
            onClick: this.props.onClick,
            label: this.props.label,
        };
    }

    render() {
        return (
            <a href="#" className={this.state.class}
               onClick={this.state.onClick}>
                <div className="bottom default-bottom"></div>
                <div className="top default-top">
                    <div className="label">
                        {this.state.label}
                    </div>
                    <div className="button-border button-border-left"></div>
                    <div className="button-border button-border-top"></div>
                    <div className="button-border button-border-right"></div>
                    <div className="button-border button-border-bottom"></div>
                </div>
            </a>
        )
    }
}
