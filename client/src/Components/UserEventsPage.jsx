import React from 'react';
import EventCard from './EventCard.jsx';
import styles from '../styles/Events.css';

const UserEventsPage = (props) => {
  return (
    <div className={styles.eventPage}>
      <div
        style={{
          display: 'flex',
          width: 'auto',
          padding: '1em 23em'
        }}
      >
        <div style={{ width: 'auto' }}>
          <h2>My Events</h2>
          <div className={styles.eventListContainer}>
            <div className={styles.eventList}>
              {props.events.map((event, index) => {
                return <EventCard event={event} key={index} joinEventIfExists={props.joinEventIfExists} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEventsPage;
