import React from 'react';
import Participants from './Participants.jsx';
import styles from '../styles/event.css';

// function myFunction() {
//   var copyText = document.getElementById('myInput');
//   copyText.select();
//   document.execCommand('copy');
// }

const Event = ({ event }) => {
  console.log(event.id);
  return (
    <div className={styles.indEventContainer}>
      <hr />
      <div className={styles.title}>
        <a href={'/join/' + event.id}>{event.title}</a>
      </div>
      {/* <button onClick={() => myFunction()}>Get link</button> */}
      <div>{event.description}</div>
      <Participants participants={event.participants} />
    </div>
  );
};

export default Event;
