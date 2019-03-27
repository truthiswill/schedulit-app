import React, { Component } from "react";
import styles from "../styles/login.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.schedulIt} >
            <img src="greenLogo.png" style={{ width: '1.5em', height: '1.5em', padding: '0.3em' }}></img>
            <div>Schedulit</div>
          </div>
          <div className={styles.loginCenter}>
            <button
              className={styles.button}
              onClick={this.props.openLoginPopup}
            >
              <img src ="GoogleButton.png" width="240" height="50"></img>
            </button>
          </div>
        </div>
      </div>

    );
  }
}

export default LoginPage;
