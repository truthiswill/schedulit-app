import React from 'react';
import JoinEvent from './JoinEvent';
import Events from './Events.jsx';
import Create from './Create.jsx';
import Navigation from './Navigation.jsx';
import axios from 'axios';
import Cookies from 'js-cookie';


class MainDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'eventPage',
      events: []
		}
		this.joinEventIfExists = this.joinEventIfExists.bind(this);
  }

  componentDidMount() {
    let eventId = Cookies.get('eventId');
    this.joinEventIfExists(eventId);
    this.fetchEvents();
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
          this.setState({ eventData: data, view: 'joinPage' });
        })
        .catch(() => console.log('event does not exist'));
    }
  }

  fetchEvents() {
    axios
      .get('/api/user')
      .then(({ data }) => {
        let events = data.eventsCreated;
        //Checks if user is logged in
        if (data.id !== undefined) {
          this.setState({ loggedIn: true });
        }
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

  getDisplay() {
    if (this.state.view === 'createPage') {
      return <Create />;
    } else if (this.state.view === 'eventPage') {
      return <Events events={this.state.events} joinEventIfExists = {this.joinEventIfExists} />;
    } else if (this.state.view === 'joinPage') {
      return <JoinEvent eventData={this.state.eventData} />;
    }
  }

  changeView(view) {
    this.setState({ view })
  }

  render() {
    return (
      <div>
        <Navigation changeView={this.changeView} />
        {this.getDisplay()}
      </div>
    );
  }
}

export default MainDisplay;