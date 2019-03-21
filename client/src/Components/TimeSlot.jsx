import React from 'react';
import IndividualSlot from './IndividualSlot'

class TimeSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      mouseDown: false,
      slotStatus: this.initializeSlotStatus()
    }
    this.startFromHere = this.startFromHere.bind(this);
    this.goToHere = this.goToHere.bind(this);
    this.includeHere = this.includeHere.bind(this);
  }

  initializeSlotStatus() {
    let numberOfSlots = (this.props.latestMinutesInDay - this.props.earliestMinutesInDay) / (15);
    let slotStatus = {}; //keys are timestamps; val is true/false for selectable, null for unselectable
    let stub = new Date(this.props.timeSlot.startTime.getFullYear(), this.props.timeSlot.startTime.getMonth(), this.props.timeSlot.startTime.getDate()).getTime();
    for (let i = 0; i < numberOfSlots; i++) {
      let currentTimeStamp = new Date(stub + (this.props.earliestMinutesInDay + (i * 15)) * 60 * 1000);
      if (currentTimeStamp >= this.props.timeSlot.startTime && currentTimeStamp <= this.props.timeSlot.endTime) {
        slotStatus[currentTimeStamp] = false;
      } else {
        slotStatus[currentTimeStamp] = null;
      }

    }
    return slotStatus;

  }

  startFromHere(slotStartTime) {
    this.state.slotStatus[slotStartTime] = true
    this.setState({
      startTime: slotStartTime,
      mouseDown: true,
      slotStatus: this.state.slotStatus
    });
  }

  goToHere(slotStartTime) {
    let newTimeSlot = {};
    newTimeSlot.startTime = slotStartTime
    newTimeSlot.endTime = new Date(new Date(slotStartTime).getTime() + (15 * 60 * 1000));
    newTimeSlot.preferenceLevel = 1;
    this.props.addToTimeAvailable(newTimeSlot);
    this.setState({ mouseDown: false });
  }

  includeHere(slotStartTime) {
    if (this.state.mouseDown) {
      for (let timestamp in this.state.slotStatus) {
        //in case of skipped elements when drag is fast
        if (new Date(timestamp) < new Date(slotStartTime)
          && new Date(timestamp) > new Date(this.state.startTime)) {
          this.state.slotStatus[timestamp] = true;
        }
      }
      this.state.slotStatus[slotStartTime] = true
      this.setState({ slotStatus: this.state.slotStatus });
    }
  }


  render() {
    let individualSlots = [];
    console.log(this.state.slotStatus)
    for (let timeStamp in this.state.slotStatus) {
      individualSlots.push(<IndividualSlot
        selected={this.state.slotStatus[timeStamp]}
        slotStartTime={timeStamp}
        startFromHere={this.startFromHere}
        goToHere={this.goToHere}
        includeHere={this.includeHere}
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

export default TimeSlot;