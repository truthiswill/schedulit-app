import React from 'react';
import axios from 'axios';

import TimeSlot from './TimeSlot';
import HourDescription from './HourDescription';

class IndividualPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeAvailable: [],
      unavailable: false,
      allTimeSlotStatuses: this.initializeAllSlotStatuses() //keys are timestamps; val is true/false for selectable, null for unselectable
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTimeSlotStatus = this.updateTimeSlotStatus.bind(this);
    this.initializeAllSlotStatuses = this.initializeAllSlotStatuses.bind(this);
		this.initializeOneSlotStatus = this.initializeOneSlotStatus.bind(this);
		this.generateLabel = this.generateLabel.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  handleSubmit(e) {
    e.preventDefault();
    let newParticipation = {};
    newParticipation.unavailable = this.state.unavailable;
    newParticipation.timeAvailable = [];
    if (!this.state.unavailable) {
      for (let timestamp in this.state.allTimeSlotStatuses) {
        if (this.state.allTimeSlotStatuses[timestamp]) {
          let timestampObject = new Date(timestamp);
          let currTimeSlot = {};
          currTimeSlot.startTime = timestampObject;
          currTimeSlot.endTime = new Date(timestampObject.getTime() + 15 * 60 * 1000);
          newParticipation.timeAvailable.push(currTimeSlot);
        }
      }
    }
    axios.put('/api/join/' + this.props.eventData.id, newParticipation).then(({ data }) => {
      this.props.socket.emit('participation');
    });
  }

  updateTimeSlotStatus(timestamp, value) {
    let allTimeSlotStatuses = this.state.allTimeSlotStatuses;
    allTimeSlotStatuses[timestamp] = value;
    this.setState({ allTimeSlotStatuses });
  }


  timestampLiesInSlot(timestamp, timeSlot) {
    timestamp = new Date(timestamp);
    return timestamp.getTime() >= timeSlot.startTime.getTime() && timestamp.getTime() < timeSlot.endTime.getTime();
  }


  initializeOneSlotStatus(timeSlot, allTimeSlotStatuses) {
    let numberOfSlots = (this.props.latestMinutesInDay - this.props.earliestMinutesInDay) / (15);
    let stub = new Date(timeSlot.startTime.getFullYear(), timeSlot.startTime.getMonth(), timeSlot.startTime.getDate()).getTime();
    for (let i = 0; i < numberOfSlots; i++) {
      let currentTimeStamp = new Date(stub + (this.props.earliestMinutesInDay + (i * 15)) * 60 * 1000);
      if (currentTimeStamp >= timeSlot.startTime && currentTimeStamp < timeSlot.endTime) {
        allTimeSlotStatuses[currentTimeStamp] =
          this.props.eventData.participations[0]
            .timeAvailable
            .some(timeSlot => this.timestampLiesInSlot(currentTimeStamp, timeSlot));
      } else {
        allTimeSlotStatuses[currentTimeStamp] = null;
      }
    }
    return allTimeSlotStatuses;
  }

  initializeAllSlotStatuses() {
    let allTimeSlotStatuses = {};
    this.props.eventData.availableSlots.map((timeSlot, index) => {
      allTimeSlotStatuses = this.initializeOneSlotStatus(timeSlot, allTimeSlotStatuses);
    });
    return allTimeSlotStatuses;
	}
	
	generateLabel(){
		return this.props.eventData.availableSlots.map((timeSlot, index) => {
			if (index === 0) {
				return (
					<HourDescription
						earliestMinutesInDay={this.props.earliestMinutesInDay}
						latestMinutesInDay={this.props.latestMinutesInDay}
						timeSlot={timeSlot}
						eventData={this.props.eventData}
						id={index}
						key={index}
						slotStatus={this.state.allTimeSlotStatuses[index]}
						// addToTimeAvailable={this.addToTimeAvailable}
						updateTimeSlotStatus={this.updateTimeSlotStatus}
					/>
				);
			}
		})
	}

  getSlotStatusForTimeSlot(timeSlot) {
    let slotStatus = {};
    Object
      .keys(this.state.allTimeSlotStatuses)
      .filter(timestamp => this.timestampLiesInSlot(timestamp, timeSlot))
      .map(timestamp => slotStatus[timestamp] = this.state.allTimeSlotStatuses[timestamp]);
    return slotStatus;
  }

  render() {
    if (this.props.eventData === undefined) return <div />;
    return (
      <form onSubmit={this.handleSubmit}>
        <div
          style={
            this.state.unavailable
              ? { display: 'none' }
              : { display: 'flex', justifyContent: 'center' }
          }
        >

          {this.generateLabel().concat ( this.props.eventData.availableSlots.map((timeSlot, index) => {
            return (
              <TimeSlot
                earliestMinutesInDay={this.props.earliestMinutesInDay}
                latestMinutesInDay={this.props.latestMinutesInDay}
                timeSlot={timeSlot}
                eventData={this.props.eventData}
                key={index}
                slotStatus={this.getSlotStatusForTimeSlot(timeSlot)}
                updateTimeSlotStatus={this.updateTimeSlotStatus}
              />
            );
          }))}
        </div>
        <input
          type="checkbox"
          name="unavailable"
          checked={this.state.unavailable}
          onChange={this.handleChange}
        />
        Click if unable to attend
        <input type="submit" name="submit" />
      </form>
    );
  }
}
export default IndividualPreview;
