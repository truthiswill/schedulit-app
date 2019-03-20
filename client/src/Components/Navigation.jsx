import React from 'react';
import styles from '../styles/Navigation.css';

const Navigation = props => {
  return (
    <div>
      <div onClick={props.changeHomeView} className={styles.title}>
        Schedulit
      </div>
      <div className={styles.buttons}>
        <div onClick={props.changeHomeView} className={styles.home}>
          Home
        </div>
        <div onClick={props.changeCreateView} className={styles.create}>
          +
        </div>
      </div>
    </div>
  );
};

export default Navigation;
