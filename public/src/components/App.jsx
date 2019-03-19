import React, { Component } from 'react';
import Events from './Events.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default',
      events: ['event1', 'event2', 'event3']
    };
  }

  changeView() {
    this.setState({ view: !this.state.view });
  }

  render() {
    let { events } = this.state;
    return (
      <div>
        <button />
        <Events events={events} />
      </div>
    );
  }
}

export default App;
