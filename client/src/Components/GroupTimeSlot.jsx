import React from 'react';
import IndividualGroupSlot from './IndividualGroupSlot';

class GroupTimeSlot extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.getSlotStatus = this.getSlotStatus.bind(this);
=======
    this.state = {
      startTime: null,
      mouseDown: false,
      slotStatus: this.initializeSlotStatus()
    };
>>>>>>> Time labels for each slot
  }

  timestampLiesInSlot(timestamp, timeSlot) {
    timestamp = new Date(timestamp);
    return timestamp.getTime() >= timeSlot.startTime.getTime() && timestamp.getTime() < timeSlot.endTime.getTime();
  }

<<<<<<< HEAD
  getSlotStatus() {
    let slotStatus = {}; //keys are timestamps; val is true/false for selectable, null for unselectable
    let numberOfSlots = (this.props.latestMinutesInDay - this.props.earliestMinutesInDay) / (15);
    let stub = new Date(this.props.timeSlot.startTime.getFullYear(), this.props.timeSlot.startTime.getMonth(), this.props.timeSlot.startTime.getDate()).getTime();
=======
  initializeSlotStatus() {
    let numberOfSlots =
      (this.props.latestMinutesInDay - this.props.earliestMinutesInDay) / 15;
    let slotStatus = {}; //keys are timestamps; val is true/false for selectable, null for unselectable
    let stub = new Date(
      this.props.timeSlot.startTime.getFullYear(),
      this.props.timeSlot.startTime.getMonth(),
      this.props.timeSlot.startTime.getDate()
    ).getTime();
>>>>>>> Time labels for each slot
    for (let i = 0; i < numberOfSlots; i++) {
      let currentTimeStamp = new Date(
        stub + (this.props.earliestMinutesInDay + i * 15) * 60 * 1000
      );
      let userAvailabilities = [];
      for (let participation of this.props.eventData.participations) {
        let isAvailable = participation.timeAvailable.some(timeSlot =>
          this.timestampLiesInSlot(currentTimeStamp, timeSlot)
        );
        userAvailabilities.push(isAvailable);
      }
      slotStatus[currentTimeStamp] = userAvailabilities;
    }
    return slotStatus;
  }

  render() {
    let slotStatus = this.getSlotStatus();
    return (
      <div>
<<<<<<< HEAD
        {this.props.timeSlot.startTime.getDate()}
        {Object.keys(slotStatus).map((timeStamp, index) => <IndividualGroupSlot
          selected={slotStatus[timeStamp]}
          slotStartTime={timeStamp}
          key={index}
        />)}
      </div >
=======
        {new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: '2-digit'
        }).format(this.props.timeSlot.startTime)}
        {Object.keys(this.state.slotStatus).map((timeStamp, index) => (
          <IndividualGroupSlot
            selected={this.state.slotStatus[timeStamp]}
            slotStartTime={timeStamp}
            key={index}
          />
        ))}
      </div>
>>>>>>> Time labels for each slot
    );
  }
}

export default GroupTimeSlot;
