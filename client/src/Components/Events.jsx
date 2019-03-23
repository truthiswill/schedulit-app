import React from 'react';
import Event from './Event.jsx';
import styles from '../styles/events.css';

const Events = ({ events }) => {
  return (
    <div className={styles.eventPage}>
      <div
        style={{
          display: 'flex',
          margin: '40px',
          width: 'auto',
          justifyContent: 'space-evenly'
        }}>
        <div style={{ width: 'auto' }} />
        <div style={{ width: 'auto' }}>
          <h2>Events I am attending</h2>
          <div className={styles.eventListContainer}>
            <div className={styles.eventList}>
              {events.map((event, index) => {
                return <Event event={event} key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
