import React from 'react';
import axios from 'axios';

import styles from '../styles/day.css';



import TimeSlot from './TimeSlot';

class JoinEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeAvailable: [],
      unavailable: false
    };
    this.addToTimeAvailable = this.addToTimeAvailable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  handleSubmit(e) {
    e.preventDefault();
    let newParticipation = {};
    newParticipation.timeAvailable = this.state.timeAvailable;
    newParticipation.unavailable = this.state.unavailable;
    axios.put('/api/participation/' + this.props.eventData.id, newParticipation).then(({ data }) => {
      console.log(data);
    });
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

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div style={this.state.unavailable ? { display: 'none' } : { display: 'flex', justifyContent: 'space-between' }}>
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
          <input
            type="checkbox"
            name="unavailable"
            checked={this.state.unavailable}
            onChange={this.handleChange}
          />
          Click if unable to attend
          <input type="submit" name="submit" />
        </form>
      </div>
    );
  }
}

export default JoinEvent;
