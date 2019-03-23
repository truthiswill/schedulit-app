import React from 'react';
import IndividualGroupSlot from './IndividualGroupSlot'

class GroupTimeSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      mouseDown: false,
      slotStatus: this.initializeSlotStatus()
    }
  }

  timestampLiesInSlot(timestamp, timeSlot) {
    return timestamp >= timeSlot.startTime && timestamp <= timeSlot.endTime;
  }

  initializeSlotStatus() {
    let numberOfSlots = (this.props.latestMinutesInDay - this.props.earliestMinutesInDay) / (15);
    let slotStatus = {}; //keys are timestamps; val is true/false for selectable, null for unselectable
    let stub = new Date(this.props.timeSlot.startTime.getFullYear(), this.props.timeSlot.startTime.getMonth(), this.props.timeSlot.startTime.getDate()).getTime();
    for (let i = 0; i < numberOfSlots; i++) {
      let currentTimeStamp = new Date(stub + (this.props.earliestMinutesInDay + (i * 15)) * 60 * 1000);
      let userAvailabilities = [];
      for (let participation of this.props.eventData.participations) {
        let isAvailable = participation.timeAvailable.some(timeSlot => this.timestampLiesInSlot(currentTimeStamp, timeSlot));
        userAvailabilities.push(isAvailable);
      }
      slotStatus[currentTimeStamp] = userAvailabilities;
    }
    console.log(slotStatus);
    return slotStatus;
  }

  render() {
    return (
      <div>
        {this.props.timeSlot.startTime.getDate()}
        {Object.keys(this.state.slotStatus).map((timeStamp, index) => <IndividualGroupSlot
          selected={this.state.slotStatus[timeStamp]}
          slotStartTime={timeStamp}
          key={index}
        />)}
      </div >
    );
  }
}

export default GroupTimeSlot;
