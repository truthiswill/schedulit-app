import React, { Component } from 'react';
import Participants from './Participants.jsx';
import styles from '../styles/event.css';

/* <a href={'/join/' + props.event.id}>{props.event.title}</a> */

class Event extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.indEventContainer}>
        <hr />
        <div
          className={styles.title}
          onClick={() => this.props.joinEventIfExists(this.props.event.id)}>
          {this.props.event.title}
        </div>
        <div>{this.props.event.description}</div>
        <Participants participants={this.props.event.participants} />
      </div>
    );
  }
}

export default Event;
