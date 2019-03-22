import React from 'react';
import styles from '../styles/calendar.css';
import classnames from 'classnames';

class Day extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={classnames(styles['set' + this.props.set], styles.calBox)}
        >
        <span
        className={styles.number}> {this.props.date.getDate()} </span>
        
      </div>
    );
  }
}

export default Day;
// onClick={() => this.props.addDayToSet(this.props.date)}