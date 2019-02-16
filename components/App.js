class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      timeList: []
    };
  }

  reset = e => {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      timeList: []
    });
  };

  start = e => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.step(), 10);
    }
  };

  step = e => {
    if (!this.state.running) return;
    this.calculate();
  };

  calculate = e => {
    const time = this.state.times;
    time.miliseconds += 1;
    if (time.miliseconds >= 100) {
      time.seconds += 1;
      time.miliseconds = 0;
    }
    if (time.seconds >= 60) {
      time.minutes += 1;
      time.seconds = 0;
    }
    this.setState({ time });
  };

  stop = e => {
    this.setState({ running: false });
    clearInterval(this.watch);
  };

  pad0 = value => {
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  };

  time() {
    return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(this.state.times.miliseconds)}`;
  }

  toList = e => {
    let time = this.time();
    this.setState(prevState => ({
      timeList: [...prevState.timeList, time]
    }))
    console.log(this.state.timeList)
  }


  render() {
    return (
      <div>
        <div className="container">
          <nav className="controls">
            <a href="#" className="button" onClick={this.start}>
              Start
            </a>
            <a href="#" className="button" onClick={this.stop}>
              Stop
            </a>
          </nav>
          <div className="stopwatch">
            {this.time()}
          </div>
          <nav className="controls">
            <a href="#" className="button" onClick={this.reset}>
              Reset
            </a>
            <a href="#" className="button" onClick={this.toList}>
              To list
            </a>
          </nav>
        </div>
        <div className="list-container">
          <h2 className="list-header">Result list:</h2>
          <ul className="results"> {(this.state.timeList || []).map(item => (
            <li key={item}>{item}</li>
          ))}</ul>
        </div>
      </div>
    );
  }
}
