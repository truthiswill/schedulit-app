import React from 'react';
import styles from '../styles/navigation.css';

const Navigation = ({ homeView, createView }) => {
  return (
    <div className={styles.navigation}>
      <div onClick={() => homeView()}>Schedulit</div>
      <div className={styles.buttons}>
        <div onClick={() => homeView()} className={styles.myEvents}>
          My Events
        </div>
        <div onClick={() => createView()} className={styles.create}>
          Create an event!
        </div>
      </div>
    </div>
  );
};

export default Navigation;
