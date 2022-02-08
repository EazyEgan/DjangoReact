import React, { Component } from 'react'
import '../style/bar.css'


export default class CountDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: this.props.seconds,
            handleCountDownFinish: this.props.handleCountDownFinish,
            countDownText: this.props.countDownText,
            finishText: this.props.finishText,

        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    componentDidMount() {
        let timeLeftVar = this.state.seconds;
        this.setState({ time: timeLeftVar, mounted: true });
    }


    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.seconds !== prevProps.seconds) {
            this.setState({            seconds: this.props.seconds,
        })
    }
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    resetTimer(){
        this.setState({
            seconds: 2,
        });
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({

            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0 && this.state.mounted) {
            clearInterval(this.timer);
            this.state.handleCountDownFinish()
        }
    }

    render() {
        this.startTimer()
        return(
            <div>
                { this.state.seconds-1 === 0
                    ? <h1>{this.state.finishText}</h1>
                    : <h1>{this.state.countDownText}: {this.state.seconds-1}</h1>
                }
            </div>
        );
    }
}
