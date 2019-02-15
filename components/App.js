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
      timeList :[]
    };
  }

  reset = e => {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
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
    const times = this.state.times;
    times.miliseconds += 1;
    if (times.miliseconds >= 100) {
      times.seconds += 1;
      times.miliseconds = 0;
    }
    if (times.seconds >= 60) {
      times.minutes += 1;
      times.seconds = 0;
    }
    this.setState({ times });
  };

  stop = e => {
    this.setState({ running: false });
    clearInterval(this.watch);
  };

  toList = e => {
    this.setState(prevState => ({
        timeList: [...prevState.timeList, this.state.times]
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
          <ShowTime times={this.state.times} />
          <nav className="controls">
            <a href="#" className="button" onClick={this.reset}>
              Reset
            </a>
            <a href="#" className="button" onClick={this.toList}>
              To list
            </a>
            <a href="#" className="button" onClick={this.resetList}>
              Reset list
            </a>
          </nav>
        </div>
        <div className="list-container">
          <h2 className="list-header">Result list:</h2>
         <Result times={this.state.timeList}/>
        </div>
      </div>
    );
  }
}
