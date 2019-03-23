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
      loggedIn: false,
      view: 'loginPage',
      events: []
    };
    
		this.fetchEvents = this.fetchEvents.bind(this);
		this.fetchEvents();
    this.setEventView = this.setEventView.bind(this);
    this.setCreateView = this.setCreateView.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.joinEventIfExists = this.joinEventIfExists.bind(this)
    window.isUserLoggedIn = false;
    window.forceReactUpdate = this.forceUpdate.bind(this);
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

  componentDidMount() {
		let eventId = Cookies.get('eventId');
    this.joinEventIfExists(eventId);
  }

   fetchEvents() {
     axios
      .get('/api/user')
      .then(({ data }) => {
        let events = data.eventsCreated;

        //Checks if user is logged in
        if (data.id !== undefined) {
					this.setState({ loggedIn: true, view: "eventPage"});
        } 

        Promise.all(
          events.map(event => {
            return axios.get('/api/event/' + event).then(({ data }) => data);
          })
        ).then(eventsArr => {
					this.setState({ events: eventsArr});
					
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
		console.log('this.state.loggedin', this.state.loggedIn)
		console.log('this.state.view', this.state.view)
		if (this.state.loggedIn) {
      if (this.state.view === 'createPage') {
				display = <Create />;
      } else if (this.state.view === 'eventPage') {
				display = <Events events={this.state.events} joinEventIfExists = {this.joinEventIfExists}/>;
				console.log(this.state. eventData)
      } else if (this.state.eventData !== undefined || this.state.view ==='joinPage') {
				display = <JoinEvent eventData={this.state.eventData} />;
			}
    } else {
      display = <Login loginUser={this.loginUser} />;
    }
	

    if (window.isUserLoggedIn) {
			console.log('triggered forceupdate from popup')
			this.fetchEvents();
			this.setState({loggedIn: true, view:'eventPage'})
      window.isUserLoggedIn = false; // sorry hacky but less line
      display = <Events events={this.state.events} />;
    }

    return (
      <div className={`${styles.masterContainer}`}>
        <Navigation setEventView={this.setEventView} setCreateView={this.setCreateView} />
        {display}
      </div>
    );
  }
}

export default App;
