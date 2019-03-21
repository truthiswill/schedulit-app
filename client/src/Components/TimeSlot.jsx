import React from 'react';
import styles from '../styles/day.css';


class TimeSlot extends React.Component {
  constructor(props) {
    super(props);
    let currStart = this.props.timeSlot.startTime;

    console.log('cs', currStart);
    console.log('cs -y', currStart.getFullYear());
    console.log('cs-m', currStart.getMonth());
    console.log('cs-d', currStart.getDate());
    console.log('stub', new Date(currStart.getFullYear(), currStart.getMonth(), currStart.getDate()));
    this.state = {
      stub: new Date(currStart.getFullYear(), currStart.getMonth(), currStart.getDate()).getTime(),
      startTime: null
    }
    this.startFromHere = this.startFromHere.bind(this);
    this.goToHere = this.goToHere.bind(this);
  }
  startFromHere(currMinutes) {
    this.setState({
      startTime: currMinutes
    });
  }

  goToHere(currMinutes) {
    let newTimeSlot = {};
    console.log('state startTime', this.state.startTime);
    newTimeSlot.startTime = new Date(this.state.stub + this.state.startTime * 60 * 1000);
    newTimeSlot.endTime = new Date(this.state.stub + (currMinutes + 15) * 60 * 1000);
    newTimeSlot.preferenceLevel = 1;
    console.log('newTimeSlot', newTimeSlot);

    this.props.addToTimeAvailable(newTimeSlot);
  }


  render() {

    // let currentInterval = this.props.timeSlot.endTime - this.props.timeSlot.startTime;
    let maxInterval = (this.props.latestMinutesInDay - this.props.earliestMinutesInDay) / (15);
    let blocks = [];
    let todayStart = this.props.timeSlot.startTime.getHours() * 60 + this.props.timeSlot.startTime.getMinutes();
    let todayEnd = this.props.timeSlot.endTime.getHours() * 60 + this.props.timeSlot.endTime.getMinutes();
    for (let i = 0; i < maxInterval; i++) {
      let currMinutes = this.props.earliestMinutesInDay + (i * 15);
      if (currMinutes >= todayStart && currMinutes <= todayEnd) {
        blocks.push(<div
          onMouseDown={() => this.startFromHere(currMinutes)}
          onMouseUp={() => this.goToHere(currMinutes)}

          style={{ backgroundColor: 'grey' }}>{'Selectable'}</div>)
      } else {
        blocks.push(<div>{'Not Selectable'}</div>)
      }
    }
    return (
      <div>
        {this.props.timeSlot.startTime.getDate()}
        {blocks}
      </div >
    );
  };
}

export default TimeSlot;