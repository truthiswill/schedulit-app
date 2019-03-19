import React, { Component } from 'react';
import Events from './Events.jsx';
import Create from './Create.jsx';
import Navigation from './Navigation.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      events: ['event1', 'event2', 'event3']
    };
    this.changeHomeView = this.changeHomeView.bind(this);
    this.changeCreateView = this.changeCreateView.bind(this);
  }

  changeHomeView() {
    console.log('Clicked home');
    this.setState({ view: 'home' });
  }

  changeCreateView() {
    console.log('Clicked create');
    this.setState({ view: 'create' });
  }

  render() {
    let { events, view } = this.state;
    return (
      <div>
        <Navigation
          changeHomeView={this.changeHomeView}
          changeCreateView={this.changeCreateView}
        />
        <div>{view === 'home' ? <Events events={events} /> : <Create />}</div>
      </div>
    );
  }
}

export default App;
