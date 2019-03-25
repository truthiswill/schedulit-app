import React from "react";
import styles from "../styles/navigation.css";

const Navigation = ({ changeView }) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.schedulIt} onClick={() => changeView('eventPage')} >
        <img src="logo.png" style={{width: '1.5em', height: '1.5em', padding: '0.3em'}}></img>
				<div>
				Schedulit
					</div>
      </div>

			<div className={styles.tabs}>

			<div onClick={() =>  changeView('eventPage')} className={styles.clickables}>
				My Events
			</div>



			<div onClick={() => changeView('createPage')} className={styles.clickables}>
				Create an event!
			</div>

			</div>
    </div>
  );
};

export default Navigation;
