import React from 'react';

import GroupPreview from './GroupPreview'
import IndividualPreview from './IndividualPreview'
import axios from 'axios';

class JoinEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      earliestMinutesInDay: this.findEarliestMinutesInDay(this.props.eventData.availableSlots),
      latestMinutesInDay: this.findLatestMinutesInDay(this.props.eventData.availableSlots),
    }
    this.getEventParticipationData();
  }

  getEventParticipationData() {
    console.log('event fkn data', this.props.eventData);
    axios.get('/api/user').then(({ data }) => {
      let userData = data;
      this.setState({ userData });
      Promise.all(this.props.eventData.participations.map(participationId => {
        return axios.get('/api/participation/' + participationId).then(({ data }) => data);
      }))
        .then((participations) => {
          let eventParticipationData = this.props.eventData;
          eventParticipationData.participations = participations
            .filter((participation) => participation.userId === userData.id)
            .concat(participations
              .filter((participation) => participation.userId !== userData.id));
          console.log('eventParticipationData', eventParticipationData);
          this.setState({ eventParticipationData });
        })
    })
  }

  findEarliestMinutesInDay(slots) {
    let earliestMinutesInDay = 24 * 60;
    slots.forEach(slot => {
      let start = slot.startTime.getHours() * 60 + slot.startTime.getMinutes();
      if (start < earliestMinutesInDay) earliestMinutesInDay = start;

    });
    return earliestMinutesInDay;
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
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <IndividualPreview
          eventData={this.props.eventData}
          earliestMinutesInDay={this.state.earliestMinutesInDay}
          latestMinutesInDay={this.state.latestMinutesInDay}
        />
        <GroupPreview
          eventData={this.state.eventParticipationData}
          earliestMinutesInDay={this.state.earliestMinutesInDay}
          latestMinutesInDay={this.state.latestMinutesInDay}
        />
      </div>
    );
  }
}

export default JoinEvent;
