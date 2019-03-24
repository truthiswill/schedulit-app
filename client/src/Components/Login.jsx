import React, { Component } from 'react';
import styles from '../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${styles.overAll}`}>
        <div className={`${styles.inner}`}>
          <div className={`${styles.directions}`}>
            Please Login to use the app
          </div>
          <div className={`${styles.loginCenter}`}>
            <button
              className={`${styles.button}`}
              onClick={this.props.loginUser}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
