import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import styles from '../styles/app.css'
import LoginPage from './LoginPage.jsx';
import MainDisplay from './MainDisplay.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.isUserInSession();
    Cookies.remove('sendToHome');
    window.logUserIn = this.logUserIn.bind(this);
    this.openLoginPopup = this.openLoginPopup.bind(this);
  }

  isUserInSession() {
    return axios.get('/api/user').then(({ data }) => this.setState({ loggedIn: data.id }));
  }

  logUserIn() {
    this.setState({ loggedIn: true })
  }

  openLoginPopup() {
    window.open('/auth/google', 'Login Page', 'width=700, height=700');
  }

  render() {
		return (
			<div className={styles.masterContainer}> 
				{this.state.loggedIn ? <MainDisplay view={this.state.view} loggedIn={this.state.loggedIn} /> : <LoginPage openLoginPopup={this.openLoginPopup} />}
			</div>

		)


  }
}

export default App;
