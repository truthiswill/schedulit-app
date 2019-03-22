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
    console.log('participations', JSON.stringify(this.props.eventData.participations));
    let numberOfSlots = (this.props.latestMinutesInDay - this.props.earliestMinutesInDay) / (15);
    let slotStatus = {}; //keys are timestamps; val is true/false for selectable, null for unselectable
    let stub = new Date(this.props.timeSlot.startTime.getFullYear(), this.props.timeSlot.startTime.getMonth(), this.props.timeSlot.startTime.getDate()).getTime();
    for (let i = 0; i < numberOfSlots; i++) {
      let currentTimeStamp = new Date(stub + (this.props.earliestMinutesInDay + (i * 15)) * 60 * 1000);
      let userAvailabilities = [];
      for (let participation of this.props.eventData.participations) {
        let isAvailable = false;
        participation.timeAvailable.forEach(timeSlot => {
          isAvailable = isAvailable ? true : this.timestampLiesInSlot(currentTimeStamp, timeSlot);
        });
        userAvailabilities.push(isAvailable);
      }
      slotStatus[currentTimeStamp] = userAvailabilities;
    }
    console.log(slotStatus);
    return slotStatus;
  }

  render() {
    let individualSlots = [];
    for (let timeStamp in this.state.slotStatus) {
      individualSlots.push(<IndividualGroupSlot
        selected={this.state.slotStatus[timeStamp]}
        slotStartTime={timeStamp}
      />)
    }

    return (
      <div>
        {this.props.timeSlot.startTime.getDate()}
        {individualSlots}
      </div >
    );
  }
}

export default GroupTimeSlot;
