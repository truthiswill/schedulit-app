import React, { Component } from 'react';
import Events from './Events.jsx';
// import Create from './Create.jsx';
import Navigation from './Navigation.jsx';
import Details from './Details.jsx';
// import { getMonth, getDate, setMonth, getDay } from 'date-fns';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      currentEvent: {},
      events: [
        //dummy data
        {
          id: 1,
          creatorId: 1,
          title: "Scott's BBQ",
          description: 'Fun times',
          availableSlots: ['slots'],
          participations: [1, 2, 3],
          allowedPreferences: ''
        },
        {
          id: 2,
          creatorId: 1,
          title: 'Meet up',
          description: 'Come Learn',
          availableSlots: [],
          participations: [1],
          allowedPreferences: ''
        }
      ]
    };
    this.changeHomeView = this.changeHomeView.bind(this);
    this.changeCreateView = this.changeCreateView.bind(this);
    this.changeDetailView = this.changeDetailView.bind(this);
  }

  changeHomeView() {
    this.setState({ view: 'home' });
  }

  changeCreateView() {
    this.setState({ view: 'create' });
  }

  changeDetailView(id) {
    let { events } = this.state;
    let event = events.filter(event => event.id === id);
    this.setState({ view: 'details', currentEvent: event[0] });
  }

  render() {
    let { events, view, currentEvent } = this.state;
    let page;

    if (view === 'home') {
      page = (
        <Events events={events} changeDetailView={this.changeDetailView} />
      );
    } else if (view === 'create') {
      page = null;
    } else if (view === 'details') {
      page = <Details currentEvent={currentEvent} />;
    }

    return (
      <div>
        <Navigation
          changeCreateView={this.changeCreateView}
          changeHomeView={this.changeHomeView}
        />
        {page}
      </div>
    );
  }
}

export default App;
