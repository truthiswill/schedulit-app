import React from "react";
import styles from "../styles/navigation.css";

const Navigation = ({ changeView }) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.schedulIt} onClick={() => changeView('eventPage')} >
        Schedulit
      </div>
      <div className={styles.alignHorizontal}>
        <div className={styles.buttonContainer}>
          <div onClick={() =>  changeView('eventPage')} className={styles.clickables}>
            My Events
          </div>
          <div onClick={() => changeView('createPage')} className={styles.clickables}>
            Create an event!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
