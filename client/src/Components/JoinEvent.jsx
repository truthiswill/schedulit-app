import React from 'react';
import GroupPreview from './GroupPreview';
import IndividualPreview from './IndividualPreview';
import axios from 'axios';

import styles from '../styles/day.css';

import TimeSlot from './TimeSlot';

class JoinEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      earliestMinutesInDay: this.findEarliestMinutesInDay(
        this.props.eventData.availableSlots
      ),
      latestMinutesInDay: this.findLatestMinutesInDay(
        this.props.eventData.availableSlots
      )
    };
    this.getEventParticipationData();
  }

  getEventParticipationData() {
    axios.get('/api/user').then(({ data }) => {
      let userData = data;
      this.setState({ userData });
      Promise.all(
        this.props.eventData.participations.map(participationId => {
          return axios
            .get('/api/participation/' + participationId)
            .then(({ data }) => data);
        })
      ).then(participations => {
        let eventParticipationData = this.props.eventData;
        // place user participation first in array
        eventParticipationData.participations = participations
          .filter(participation => participation.userId === userData.id)
          .concat(
            participations.filter(
              participation => participation.userId !== userData.id
            )
          );
        // convert utc store in db to user timezone
        eventParticipationData.participations = eventParticipationData.participations.map(
          participation => {
            participation.timeAvailable = participation.timeAvailable.map(
              timeSlot => {
                timeSlot.startTime = new Date(timeSlot.startTime);
                timeSlot.endTime = new Date(timeSlot.endTime);
                return timeSlot;
              }
            );
            return participation;
          }
        );
        this.setState({ eventParticipationData });
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let newParticipation = {};
    newParticipation.timeAvailable = this.state.timeAvailable;
    newParticipation.unavailable = this.state.unavailable;
    axios
      .put('/api/participation/' + this.props.eventData.id, newParticipation)
      .then(({ data }) => {
        console.log(data);
      });
  }

  findLatestMinutesInDay(slots) {
    let latestMinutesInDay = 0;
    slots.forEach(slot => {
      let end = slot.endTime.getHours() * 60 + slot.endTime.getMinutes();
      if (end > latestMinutesInDay) latestMinutesInDay = end;
    });
    return latestMinutesInDay;
  }

  render() {
    if (this.state.eventParticipationData === undefined) return <div />;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div
            style={
              this.state.unavailable
                ? { display: 'none' }
                : { display: 'flex', justifyContent: 'space-between' }
            }
          >
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
