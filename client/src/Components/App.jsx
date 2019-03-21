import React, { Component } from 'react';
import Events from './Events.jsx';
import Create from './Create.jsx';
import Navigation from './Navigation.jsx';
import { getMonth, getDate, setMonth, getDay } from 'date-fns';
import Cookies from 'js-cookie';
import axios from 'axios';
import JoinEvent from './JoinEvent';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'home',
      events: ['event1', 'event2', 'event3']
    };
    let eventId = Cookies.get('eventId');
    this.joinEventIfExists(eventId);

    this.homeView = this.homeView.bind(this);
    this.createView = this.createView.bind(this);
    // let eventId = document.cookie.slice(document.cookie.indexOf('eventId=');
  }

  joinEventIfExists(eventId) {
    if (eventId) {
      axios
        .get('/api/event/' + eventId)
        .then(({ data }) => {
          Cookies.remove('eventId');
          console.log(Cookies.get('eventId'));
          console.log(data);
          data.availableSlots = data.availableSlots.map(timeSlot => {
            return {
              startTime: new Date(timeSlot.startTime),
              endTime: new Date(timeSlot.endTime)
              // not including preference level as not meaningful
            };
          });
          this.setState({ eventData: data });
        })
        .catch(() => console.log('i guess it was an error'));
    }
  }

  componentDidMount() {
    let today = Date();
    console.log(today);
    console.log(getDate(today), 'day in the week');
  }

  homeView() {
    this.setState({ view: 'home' });
  }

  createView() {
    this.setState({ view: 'create' });
  }

  render() {
    let { events, view, eventData } = this.state;
    let page;
    if (eventData !== undefined) {
      return <JoinEvent eventData={eventData} />;
    }

    if (view === 'home') {
      page = <Events events={events} />;
    } else if (view === 'create') {
      page = <Create />;
    }

    return (
      <div>
        <Navigation homeView={this.homeView} createView={this.createView} />
        {page}
      </div>
    );
  }
}

export default App;
