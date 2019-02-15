class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  reset = e => {
    this.setState({
      minutes: 0,
      seconds: 0,
      miliseconds: 0
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
    this.setState({ miliseconds: this.state.miliseconds + 1 });
    if (this.state.miliseconds >= 100) {
      this.setState({ seconds: this.state.seconds + 1 });
      this.setState({ miliseconds: 0 });
    }
    if (this.state.seconds >= 60) {
      this.setState({ minutes: this.state.minutes + 1 });
      this.setState({ seconds: 0 });
    }
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

  render() {
    return (
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
          {this.pad0(this.state.minutes)}:{this.pad0(this.state.seconds)}:
          {Math.floor(this.pad0(this.state.miliseconds))}
        </div>
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
    );
  }
}

class Result extends React.Component {
  render() {
    return <ul className="results" />;
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <StopWatch />
        <div className="list-container">
          <h2 className="list-header">Result list:</h2>
          <Result />
        </div>
      </div>
    );
  }
}

var app = React.createElement(App);
ReactDOM.render(app, document.getElementById('app'));
