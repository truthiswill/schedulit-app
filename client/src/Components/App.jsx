import React, { Component } from 'react';
import Events from './Events.jsx';
import Create from './Create.jsx';
import Navigation from './Navigation.jsx';
import Login from './Login.jsx';
import JoinEvent from './JoinEvent';
import Cookies from 'js-cookie';
import axios from 'axios';
import styles from '../styles/app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: this.hasLoginCookies(),
      view: 'loginPage',
      events: []
    };

    let eventId = Cookies.get('eventId');
    this.joinEventIfExists(eventId);

    this.setEventView = this.setEventView.bind(this);
    this.setCreateView = this.setCreateView.bind(this);
    this.loginUser = this.loginUser.bind(this);
    
    window.isUserLoggedIn = false;
    window.forceReactUpdate = this.forceUpdate.bind(this);
  }

  hasLoginCookies() {
    let x = Cookies.get('session');
    let y = Cookies.get('session.sig');
    if (x && y) {
      console.log('hello');
      return true;
    }
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
          this.setState({ eventData: data }, () => {
            this.fetchEvents();
          });
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

  loginUser() {
    window.open('/auth/google', 'Login', 'width=700, height=700');
  }

  setEventView() {
		console.log('triggered')
    this.setState({ view: 'eventPage' });
  }

  setCreateView() {
    this.setState({ view: 'createPage' });
  }

  render() {

		let display;

		if (this.state.loggedIn) {
      if (this.state.view === 'createPage') {
				display = <Create />;
      } else if (this.state.view === 'eventPage') {
        display = <Events events={this.state.events} />;
      } else if (this.state.eventData !== undefined) {
				display = <JoinEvent eventData={this.state.eventData} />;
			}
    } else {
      display = <Login loginUser={this.loginUser} />;
    }
	
		console.log(window.isUserLoggedIn);
    if (window.isUserLoggedIn) {
      this.fetchEvents();
      window.isUserLoggedIn = false; // sorry hacky but less line
      display = <Events events={this.state.events} />;
    }

    return (
      <div>
        <Navigation setEventView={this.setEventView} setCreateView={this.setCreateView} />
        {display}
      </div>
    );
  }
}

export default App;
