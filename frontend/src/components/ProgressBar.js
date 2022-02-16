import React, {Component} from 'react'
import '../style/bar.css'


export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: this.props.seconds,
            barShrinking: this.props.barShrinking,
            handleRepComplete: this.props.handleRepComplete,
            firstIteration: true,
            firstShrinkStart: true,
            mounted: false,
            reliefMsg: "Let's go!"
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    toggle = () => {
        if (this.state.mounted) {
            this.setState({barShrinking: !this.state.barShrinking});
            if (this.state.barShrinking == true && !this.state.firstIteration && !this.state.firstShrinkStart) {
                this.state.handleRepComplete();
            }
            if (this.state.firstShrinkStart) {
                this.setState({firstShrinkStart: !this.state.firstShrinkStart, reliefMsg: "Decompress"})
            }
        }

    }

    componentDidMount() {
        this.setState({mounted: true});
        let timeLeftVar = this.state.seconds;
        this.setState({time: timeLeftVar});


    }

    componentWillUnmount() {
        this.setState({mounted: false});
        clearInterval(this.timer);
    }


    startTimer() {
        if (this.state.mounted) {
            if (this.timer == 0 && this.state.seconds > 0) {
                this.timer = setInterval(this.countDown, 1000);
            }
        }
    }

    resetTimer() {
        if (this.state.mounted) {
            this.setState({
                seconds: this.props.seconds,//change
            });
        }
    }

    countDown() {
        if (this.state.mounted) {
            // Remove one second, set state so a re-render happens.
            let seconds = this.state.seconds - 1;
            this.setState({
                seconds: seconds,
            });

            // Check if we're at zero.
            if (seconds == 0) {
                clearInterval(this.timer);
                this.setState({firstIteration: false})
                this.timer = 0;
                this.toggle()
                this.resetTimer()
                this.startTimer()
            }
        }
    }

    renderBar = () => {
        this.startTimer()
        return (
            <div>
                <div><h1>{this.state.barShrinking ? 'Compress' : this.state.reliefMsg}</h1></div>
                s: {this.state.seconds - 1}
                <div className={`bar ${this.state.barShrinking ? "horizTranslate" : ""}`}>
                </div>
            </div>
        );

    }

    render() {

        return (
            <div>
                {this.renderBar()}


            </div>
        );

    }
}
