import React from 'react';
import styles from '../styles/calendar.css';

class Day extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        onClick={() => this.props.addDayToSet(this.props.date)}
        className={styles['set' + this.props.set]}
      >
        <span className={styles.number}>{this.props.date.getDate()}</span>
      </div>
    );
  }
}

export default Day;
