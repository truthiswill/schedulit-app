import React from "react";
import axios from 'axios';

import styles from "../styles/Legend.css";

class Legend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: []
    };
  }

  componentDidMount() {
    console.log(this.props.participants);
    this.fetchParticipants(this.props.participations);
  }

  fetchParticipants(participations) {
    Promise.all(
      participations.map(participation => {
        let id = participation.userId;
        return axios
          .get('/api/user/' + id)
          .then(({ data }) => data.googleProfile.name);
      })
    ).then(userNameArr => {
      this.setState({ names: userNameArr });
    });
  }

  render() {
    return (
      <div className={styles.container}>
        {this.state.names.map((name, index) => (
          <div className={styles.legendItem}>
            <div className={styles['selected' + index]}> </div>
            <div className={styles.username}>{name}</div>
          </div>
        ))}

      </div>
    );
  }
}
export default Legend;















