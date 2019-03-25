import React, { Component } from 'react';
import axios from 'axios';

class Participants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: []
    };
  }

  componentDidMount() {
    this.fetchParticipants(this.props.participants);
  }

  fetchParticipants(ids) {
    Promise.all(
      ids.map(id => {
        return axios
          .get('/api/user/' + id)
          .then(({ data }) => data.googleProfile.name);
      })
    ).then(userNameArr => {
      this.setState({ names: userNameArr });
    });
  }

  render() {
    let { names } = this.state;
    return (
      <div>
      { `Attending: ${names.join(', ')} (${names.length}) `}
        </div>
    );
  }
}

export default Participants;
