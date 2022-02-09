import React, {Component} from 'react'
import '../style/base.css'

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outerClass: this.props.outerClass,
            innerClass: this.props.innerClass,
            label: this.props.label,
            handleMaxChange: this.props.handleMaxChange,
            maxForCurrentExercise: this.props.maxForCurrentExercise,
        };
    }

    render() {
        return (
            <div >
                <div style={{ display: "inline-flex"}}>
                <div className={"input-label"}>{this.state.label}</div>
                </div>
                <div style={{ display: "inline-flex"}}>
                <div className={this.state.outerClass}>
                    <div className={this.state.innerClass}>

                        <input
                            type="text"
                            defaultValue={this.state.maxForCurrentExercise}
                            onChange={this.state.handleMaxChange}

                            style={{height: "100%"}}
                        />
                        <div className="button-border button-border-left"></div>
                        <div className="button-border button-border-top"></div>
                        <div className="button-border button-border-right"></div>
                        <div className="button-border button-border-bottom"></div>
                    </div>


                </div>
            </div>
            </div>
        )
    }
}
