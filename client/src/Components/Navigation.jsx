import React from 'react';
import styles from '../styles/navigation.css';

const Navigation = ({ setEventView, setCreateView }) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.schedulIt} onClick={() => setEventView()}>
        Schedulit
      </div>
      <div className={styles.alignHorizontal}>
        <div className={styles.buttonContainer}>
          <div onClick={() => setEventView()} className={styles.clickables}>
            Show Events
          </div>
          <div onClick={() => setCreateView()} className={styles.clickables}>
            Create Events
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
