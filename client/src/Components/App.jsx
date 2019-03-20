import React, { Component } from 'react';
import Events from './Events.jsx';
import Create from './Create.jsx';
import { getMonth, getDate, setMonth, getDay } from 'date-fns';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: true,
      events: ['event1', 'event2', 'event3']
    };
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount () {
    let today = Date();
    console.log (today)
    console.log (getDate(today), 'day in the week')
  }

  changeView() {
    this.setState({ view: !this.state.view });
  }

  render() {
    let { events, view } = this.state;
    return (
      <div>
        <button onClick={this.changeView}>+</button>
        <div>{view ? <Events events={events} /> : <Create />}</div>
      </div>
    );
  }
}

export default App;