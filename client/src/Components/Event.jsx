import React from 'react';
import Participants from './Participants.jsx';
import styles from '../styles/event.css';

// function myFunction() {
//   var copyText = document.getElementById('myInput');
//   copyText.select();
//   document.execCommand('copy');
// }

const Event = (props) => {
  
  return (
    <div className={styles.indEventContainer}>
      <hr />
      <div className={styles.title} onClick={()=>props.joinEventIfExists(props.event.id)}>
				{/* <a href={'/join/' + props.event.id}>{props.event.title}</a> */}
				{props.event.title}
      </div>
      {/* <button onClick={() => myFunction()}>Get link</button> */}
      <div>{props.event.description}</div>
      <Participants participants={props.event.participants} />
    </div>
  );
};

export default Event;
