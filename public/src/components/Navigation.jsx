import React from 'react';
import styles from '../styles/Navigation.css';

const Navigation = ({ changeHomeView, changeCreateView }) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.home} onClick={changeHomeView}>
        Home
      </div>
      <div className={styles.create} onClick={changeCreateView}>
        Create an event!
      </div>
    </div>
  );
};

export default Navigation;
