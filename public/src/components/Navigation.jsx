import React from 'react';
import styles from '../styles/Navigation.css';

const Navigation = ({ changeHomeView, changeCreateView }) => {
  return (
    <div className={styles.navigation}>
      <div onClick={changeHomeView}>Home</div>
      <div onClick={changeCreateView}>Create an event!</div>
    </div>
  );
};

export default Navigation;
