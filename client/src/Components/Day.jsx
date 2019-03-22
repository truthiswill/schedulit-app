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
        className={classnames(styles['set' + this.props.set], styles.calBox, styles.number)}
        > 
        {this.props.date.getDate()}
      </div>
    );
  }
}

export default Day;
//