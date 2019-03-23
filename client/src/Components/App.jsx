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

    this.homeView = this.homeView.bind(this);
    this.createView = this.createView.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.selectView = this.selectView.bind(this);

    window.forceReactUpdate = this.forceUpdate.bind(this);
    window.isUserLoggedIn = false;
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

  homeView() {
    this.setState({ view: 'eventPage' });
  }

  createView() {
    this.setState({ view: 'createPage' });
  }

  selectView() {
    if (this.state.loggedIn) {
      if (this.state.view === 'createPage') {
        return 'createPage';
      } else {
        return 'eventPage';
      }
    } else {
      return 'loginPage';
    }
  }

  render() {
    let page = this.selectView();
    let display;

    if (page === 'eventPage') {
      display = <Events events={this.state.events} />;
    } else if (page === 'loginPage') {
      display = <Login loginUser={this.loginUser} />;
    } else if (page === 'createPage') {
      display = <Create />;
    }

    if (this.state.eventData !== undefined) {
      display = <JoinEvent eventData={this.state.eventData} />;
    }

    // login = window.isUserLoggedIn;
    // console.log('rerendering, login: ', login);
    // if (this.state.loggedIn === false) {
    //   view = 'login';
    // } else {
    //   view = 'eventView';
    // }
    // console.log('login', login);

    // if (view === 'login') {
    //   page = <Login loginUser={this.loginUser} />;
    // } else if (view === 'eventView') {
    //   page = <Events events={events} />;
    // } else if (view === 'create') {
    //   page = <Create />;
    // }

    return (
      <div>
        <Navigation homeView={this.homeView} createView={this.createView} />
        {display}
      </div>
    );
  }
}

export default App;
