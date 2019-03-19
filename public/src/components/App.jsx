import React, { Component } from 'react';
import Events from './Events.jsx';
import Create from './Create.jsx';
import Navigation from './Navigation.jsx';
import EventDetail from './EventDetail.jsx';

import styles from '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      currentEvent: '',
      events: ['event 1', 'event 2', 'event 3']
    };
    this.changeHomeView = this.changeHomeView.bind(this);
    this.changeCreateView = this.changeCreateView.bind(this);
    this.changeDetailView = this.changeDetailView.bind(this);
  }

  changeHomeView() {
    this.setState({ view: 'home' }, () => {
      console.log('Clicked home');
    });
  }

  changeCreateView() {
    this.setState({ view: 'create' }, () => {
      console.log('Clicked create');
    });
  }

  changeDetailView() {
    this.setState({ view: this.state.currentEvent }, () => {
      console.log('Clicked an event');
    });
  }

  render() {
    let { events, view } = this.state;
    let page;

    if (view === 'home') {
      page = (
        <Events events={events} changeDetailView={this.changeDetailView} />
      );
    } else if (view === 'create') {
      page = <Create />;
    } else {
      page = <EventDetail />;
    }

    return (
      <div>
        <div className={styles.title}>Schedulit</div>
        <Navigation
          changeHomeView={this.changeHomeView}
          changeCreateView={this.changeCreateView}
        />
        <div>{page}</div>
      </div>
    );
  }
}

export default App;
