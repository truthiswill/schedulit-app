import React from 'react';
import styles from '../styles/day.css';

import TimeSlot from './TimeSlot';

class JoinEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeAvailable: []
    };
    this.addToTimeAvailable = this.addToTimeAvailable.bind(this);
  }

  addToTimeAvailable(timeSlot) {
    this.setState({
      timeAvailable: this.state.timeAvailable.concat(timeSlot)
    });
  }

  render() {
    let slots = this.props.eventData.availableSlots;
    let earliestMinutesInDay = 24 * 60;
    let latestMinutesInDay = 0;
    slots.forEach(slot => {
      let start = slot.startTime.getHours() * 60 + slot.startTime.getMinutes();
      let end = slot.endTime.getHours() * 60 + slot.endTime.getMinutes();
      if (start < earliestMinutesInDay) earliestMinutesInDay = start;
      if (end > latestMinutesInDay) latestMinutesInDay = end;
    });

    console.log(earliestMinutesInDay);
    console.log(latestMinutesInDay);
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {this.props.eventData.availableSlots.map(timeSlot => {
          return (
            <TimeSlot
              earliestMinutesInDay={earliestMinutesInDay}
              latestMinutesInDay={latestMinutesInDay}
              timeSlot={timeSlot}
              addToTimeAvailable={this.addToTimeAvailable}
            />
          );
        })}
      </div>
    );
  }
}

export default JoinEvent;
