import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={this.props.loginUser}>Login</button>
      </div>
    );
  }
}

export default Login;
