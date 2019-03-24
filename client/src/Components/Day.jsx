import React from 'react';
import styles from '../styles/calendar.css';
import classnames from 'classnames';

class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  getClassNames(){
    let classNames = [styles.calBox];
    if(this.props.currentMonth === this.props.date.getMonth()){
      classNames.push(styles.thisNumber);
    } else if (this.props.date.getMonth() < this.props.currentMonth){
      classNames.push(styles.lastNumber);
    } else {
      classNames.push(styles.nextNumber);
    }
    if(this.props.date < new Date()){
      classNames.push(styles.past);
    }
    return classnames(...classNames);
  }
  render() {
    return (
      <div>
        <div className={styles['set'+this.props.set]}>
          <div 
            onClick={() => this.props.addDayToSet(this.props.date)}
            className={this.getClassNames()}
            ><div>
              {this.props.date.getDate()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Day;