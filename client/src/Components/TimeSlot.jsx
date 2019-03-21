import React from 'react';
import styles from '../styles/day.css';


class TimeSlot extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    // let currentInterval = this.props.timeSlot.endTime - this.props.timeSlot.startTime;
    let maxInterval = (this.props.latestMinutesInDay - this.props.earliestMinutesInDay) / (15);
    let blocks = [];
    console.log(maxInterval);
    let todayStart = this.props.timeSlot.startTime.getHours() * 60 + this.props.timeSlot.startTime.getMinutes();
    let todayEnd = this.props.timeSlot.endTime.getHours() * 60 + this.props.timeSlot.endTime.getMinutes();
    console.log('ts', todayStart);
    console.log('te', todayEnd);
    for (let i = 0; i < maxInterval; i++) {

      let currMinutes = this.props.earliestMinutesInDay + (i * 15);
      console.log(currMinutes);
      if (currMinutes >= todayStart && currMinutes <= todayEnd) {
        blocks.push(<div>{'Selectable'}</div>)
      } else {
        blocks.push(<div>{'Not Selectable'}</div>)
      }
    }
    console.log('timeslloooot');
    console.log(blocks);
    return (
      <div>
        {this.props.timeSlot.startTime.getDate()}
        {blocks}
      </div >
    );
  };
}

export default TimeSlot;