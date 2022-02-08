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
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    toggle = () => {
        this.setState({barShrinking: !this.state.barShrinking});
        if (this.state.barShrinking == true && !this.state.firstIteration && !this.state.firstShrinkStart) {
            this.state.handleRepComplete();
        }
        if (this.state.firstShrinkStart) {
            this.setState({firstShrinkStart: !this.state.firstShrinkStart})
        }



    }

    componentDidMount() {
        let timeLeftVar = this.state.seconds;
        this.setState({time: timeLeftVar});
        this.setState({ mounted: true });


    }
    componentWillUnmount(){
        this.setState({ mounted: false });
    }



    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    resetTimer() {
        this.setState({
            seconds: this.props.seconds,//change
        });
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        if (this.state.mounted) {
            this.setState({

                seconds: seconds,
            });
        }

        // Check if we're at zero.
        if (seconds == 0 && this.state.mounted) {
            clearInterval(this.timer);
            this.setState({firstIteration: false})
            this.timer = 0;
            this.toggle()
            this.resetTimer()
            this.startTimer()
        }
    }

    renderBar = () => {
        this.startTimer()
        return (
            <div>
                <div>{this.state.barShrinking ? 'Compress' : 'Decompress'}</div>
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
