import React from 'react';
import styles from '../styles/day.css';

const INCREMENT = 0.25;
const HOURS_IN_DAY = 24;

class ChooseHours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: '',
      endTime: ''
    };
    this.hoursToString = this.hoursToString.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTimesToSet = this.addTimesToSet.bind(this);
    this.areDatesSelected = this.areDatesSelected.bind(this);
  }

  hoursToString(time) {
    let hour = Math.floor(time) % 12;
    if (hour < 1) hour += 12;
    let minutes = (time - Math.floor(time)) * 60;
    let isBeforeNoon = time < 12;
    minutes = Math.round(minutes);
    return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )} ${isBeforeNoon ? 'AM' : 'PM'}`;
  }
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  addTimesToSet() {
    this.props.addTimesToSet({
      startTime: this.state.startTime,
      endTime: this.state.endTime
    });
    this.setState({
      startTime: '',
      endTime: ''
    });
  }

  areDatesSelected() {
    return Object.values(this.props.setOfDay).includes(this.props.setCounter);
  }

  render() {
    let times = [];
    for (let i = 0; i < HOURS_IN_DAY / INCREMENT; i++) {
      times.push(i * INCREMENT);
    }
    if (this.areDatesSelected()) {
      return (
        <div>
          <select id="startTime" onChange={this.handleChange}>
            {times.map(time => (
              <option value={time}>{this.hoursToString(time)} </option>
            ))}
          </select>
          <select
            id="endTime"
            onChange={this.handleChange}
            disabled={this.state.startTime === ''}
          >
            {times
              .filter(time => time > this.state.startTime)
              .map(time => (
                <option value={time}>{this.hoursToString(time)} </option>
              ))}
          </select>
          <button
            onClick={this.addTimesToSet}
            disabled={this.state.endTime === ''}
          >
            Set Times
          </button>
        </div>
      );
    }
    return (
      <div>
        {this.props.setCounter > 1
          ? 'Would you like to add more dates?'
          : 'Pick some dates first'}
      </div>
    );
  }
}

export default ChooseHours;
