import React from 'react';
import Participants from './Participants.jsx';
import styles from '../styles/event.css';

const Event = ({ event }) => {
  return (
    <div className={styles.container}>
      <hr />
      <div>{event.title}</div>
      <div>{event.description}</div>
      <Participants participants={event.participants} />
    </div>
  );
};

export default Event;
