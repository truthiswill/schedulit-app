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
      allTimeSlotStatuses: this.initializeAllSlotStatuses()
    };
    this.addToTimeAvailable = this.addToTimeAvailable.bind(this);
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
      for (let slotStatus of Object.values(this.state.allTimeSlotStatuses)) {
        let selectedTimestamps = [];
        console.log(slotStatus);
        for (let timestamp in slotStatus) {
          console.log(timestamp);
          if (slotStatus[timestamp]) {
            selectedTimestamps.push(timestamp);
          }
        }
        selectedTimestamps.sort((t1, t2) => new Date(t1) - new Date(t2));
        let currTimeSlot = {};
        console.log(selectedTimestamps);
        selectedTimestamps.forEach(timestamp => {
          let timestampObject = new Date(timestamp);
          console.log('curr timestamp', timestamp);
          console.log('curr timeAvailable', newParticipation.timeAvailable);
          if (currTimeSlot.startTime === undefined) {
            currTimeSlot.startTime = timestampObject;
            currTimeSlot.endTime = new Date(
              timestampObject.getTime() + 15 * 60 * 1000
            );
          } else if (
            timestampObject.getTime() === +currTimeSlot.endTime.getTime()
          ) {
            currTimeSlot.endTime = new Date(
              timestampObject.getTime() + 15 * 60 * 1000
            );
          } else {
            newParticipation.timeAvailable.push(currTimeSlot);
            currTimeSlot = {};
            currTimeSlot.startTime = timestampObject;
            currTimeSlot.endTime = new Date(
              timestampObject.getTime() + 15 * 60 * 1000
            );
          }
        });
        newParticipation.timeAvailable.push(currTimeSlot);
      }
    }
    console.log(this.state.allTimeSlotStatuses);
    console.log(newParticipation);
    axios
      .put('/api/join/' + this.props.eventData.id, newParticipation)
      .then(({ data }) => {
        console.log(data);
      });
  }

  updateTimeSlotStatus(id, slotStatus) {
    let allTimeSlotStatuses = this.state.allTimeSlotStatuses;
    allTimeSlotStatuses[id] = slotStatus;
    this.setState({ allTimeSlotStatuses });
  }

  addToTimeAvailable(timeSlot) {
    this.setState({
      timeAvailable: this.state.timeAvailable.concat(timeSlot)
    });
  }

  timestampLiesInSlot(timestamp, timeSlot) {
    return timestamp >= timeSlot.startTime && timestamp <= timeSlot.endTime;
  }

  initializeOneSlotStatus(timeSlot) {
    let numberOfSlots =
      (this.props.latestMinutesInDay - this.props.earliestMinutesInDay) / 15;
    let slotStatus = {}; //keys are timestamps; val is true/false for selectable, null for unselectable
    let stub = new Date(
      timeSlot.startTime.getFullYear(),
      timeSlot.startTime.getMonth(),
      timeSlot.startTime.getDate()
    ).getTime();
    for (let i = 0; i < numberOfSlots; i++) {
      let currentTimeStamp = new Date(
        stub + (this.props.earliestMinutesInDay + i * 15) * 60 * 1000
      );
      if (
        currentTimeStamp >= timeSlot.startTime &&
        currentTimeStamp < timeSlot.endTime
      ) {
        slotStatus[
          currentTimeStamp
        ] = this.props.eventData.participations[0].timeAvailable.some(
          timeSlot => this.timestampLiesInSlot(currentTimeStamp, timeSlot)
        );
      } else {
        slotStatus[currentTimeStamp] = null;
      }
    }
    return slotStatus;
  }

  initializeAllSlotStatuses() {
    let allTimeSlotStatuses = {};
    this.props.eventData.availableSlots.map((timeSlot, index) => {
      allTimeSlotStatuses[index] = this.initializeOneSlotStatus(timeSlot);
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
          {/* <TimeLabel
          // earliestMinutesInDay={this.props.earliestMinutesInDay}
          // latestMinutesInDay={this.props.latestMinutesInDay}
          // eventData={this.props.eventData}
          // key={index}
          // slotStatus={this.state.allTimeSlotStatuses[index]}
          // // addToTimeAvailable={this.addToTimeAvailable}
          // updateTimeSlotStatus={this.updateTimeSlotStatus}
          /> */}
       

          {this.generateLabel().concat ( this.props.eventData.availableSlots.map((timeSlot, index) => {
            return (
              <TimeSlot
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
