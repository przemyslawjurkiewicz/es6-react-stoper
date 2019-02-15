class ShowTime extends React.Component {
    pad0 = value => {
      let result = value.toString();
      if (result.length < 2) {
        result = '0' + result;
      }
      return result;
    };
  
    render() {
      return (
        <div className="stopwatch">
          {this.pad0(this.props.times.minutes)}:
          {this.pad0(this.props.times.seconds)}:
          {Math.floor(this.pad0(this.props.times.miliseconds))}
        </div>
      );
    }
  }