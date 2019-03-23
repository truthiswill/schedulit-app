import React from 'react';
import styles from '../styles/calendar.css';
import classnames from 'classnames';

class Day extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div onClick={() => this.props.addDayToSet(this.props.date)}
        className={classnames(styles.calBox, styles.number, styles['set' + this.props.set])}
        > 
        {this.props.date.getDate()}
      </div>
    );
  }
}

export default Day;
//