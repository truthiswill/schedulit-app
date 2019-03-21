import React, { Component } from 'react';
import Events from './Events.jsx';
import Create from './Create.jsx';
import Navigation from './Navigation.jsx';
import JoinEvent from './JoinEvent';
import Cookies from 'js-cookie';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'home',
      events: []
    };

    let eventId = Cookies.get('eventId');
    this.joinEventIfExists(eventId);

    this.homeView = this.homeView.bind(this);
    this.createView = this.createView.bind(this);
  }

  joinEventIfExists(eventId) {
    if (eventId) {
      axios
        .get('/api/event/' + eventId)
        .then(({ data }) => {
          Cookies.remove('eventId');
          data.availableSlots = data.availableSlots.map(timeSlot => {
            return {
              startTime: new Date(timeSlot.startTime),
              endTime: new Date(timeSlot.endTime)
              // not including preference level as not meaningful
            };
          });
          this.setState({ eventData: data });
        })
        .catch(() => console.log('event does not exist'));
    }
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    axios
      .get('/api/user')
      .then(({ data }) => {
        let events = data.eventsCreated;
        Promise.all(
          events.map(event => {
            return axios.get('/api/event/' + event).then(({ data }) => data);
          })
        ).then(eventsArr => {
          this.setState({ events: eventsArr });
        });
      })
      .catch(error => console.error(error));
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
    } else {
      // page = full details of event
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



