class Result extends React.Component {
    
    log = (e) => {
    console.log(this.props.timeList)
    }
    render() {
       
       return( <ul className="results" >{this.props.timeList}</ul>);
    }
  }