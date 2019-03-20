import React, { Component } from 'react';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.openLoginWindow = this.openLoginWindow.bind(this);
  }

  openLoginWindow() {
    window.open('/auth/google', "new window", 'width=600,height=600');
  }

  render() {
    return (
      <div>
        <a
          href="/auth/google"
          target="popup"
          onClick={this.openLoginWindow}
        >
          Click Here to Login
        </a>
      </div>
    );
  }
}

export default LoginPage
