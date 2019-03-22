import React from 'react';
import axios from 'axios';

import TimeSlot from './TimeSlot';

class IndividualPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeAvailable: [],
      unavailable: false,

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
    console.log('newParticipation', JSON.stringify(newParticipation));
    axios.put('/api/join/' + this.props.eventData.id, newParticipation).then(({ data }) => {
      console.log(data);
    });
  }

  addToTimeAvailable(timeSlot) {
    this.setState({
      timeAvailable: this.state.timeAvailable.concat(timeSlot)
    });
  }

  render() {
    if (this.props.eventData === undefined) return <div />;
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={this.state.unavailable ? { display: 'none' } : { display: 'flex', justifyContent: 'space-between' }}>
          {this.props.eventData.availableSlots.map(timeSlot => {
            return (
              <TimeSlot
                earliestMinutesInDay={this.props.earliestMinutesInDay}
                latestMinutesInDay={this.props.latestMinutesInDay}
                timeSlot={timeSlot}
                eventData={this.props.eventData}
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
    )
  }
}
export default IndividualPreview;






