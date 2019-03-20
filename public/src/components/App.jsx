import React, { Component } from 'react';
import Events from './Events.jsx';
import Create from './Create.jsx';
import Navigation from './Navigation.jsx';

import styles from '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'create',
      events: ['event 1', 'event 2', 'event 3']
    };
    this.changeHomeView = this.changeHomeView.bind(this);
    this.changeCreateView = this.changeCreateView.bind(this);
  }

  changeHomeView() {
    this.setState({ view: 'home' });
  }

  changeCreateView() {
    this.setState({ view: 'create' });
  }

  render() {
    let { events, view } = this.state;
    let page;

    if (view === 'home') {
      page = <Events events={events} />;
    } else if (view === 'create') {
      page = <Create />;
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
