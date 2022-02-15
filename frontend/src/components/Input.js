import React, {Component} from 'react'
import '../style/base.css'

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outerClass: this.props.outerClass,
            innerClass: this.props.innerClass,
            label: this.props.label,
            labelClass: this.props.labelClass,
            inputTextType: this.props.inputTextType,
            handleChange: this.props.handleChange,
            defaultData: this.props.defaultData,
        };
    }

    render() {
        return (
            <div >
                <div style={{ display: "inline-flex"}}>
                <div className={this.state.labelClass}>{this.state.label}</div>
                </div>
                <div style={{ display: "inline-flex"}}>
                <div className={this.state.outerClass}>
                    <div className={this.state.innerClass}>

                        <input
                            type={this.inputTextType}
                            defaultValue={this.state.defaultData}
                            onChange={this.state.handleChange}

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
