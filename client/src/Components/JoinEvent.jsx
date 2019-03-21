import React from 'react';
import styles from '../styles/day.css';


class JoinEvent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {JSON.stringify(this.props.eventData)}
      </div>
    );
  };
}

export default JoinEvent;