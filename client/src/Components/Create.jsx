import React, { Component } from 'react';
import DayPicker from './DayPicker.jsx';
import ChooseHours from './ChooseHours';
import axios from 'axios';

class Create extends Component {
  constructor(props) {
    super(props);
    let currentDate = new Date();
    this.state = {
      setCounter: 1,
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear(),
      setTimes: {}
    };
    this.state.setOfDay = this.createSetOfDay();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addDayToSet = this.addDayToSet.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.addTimesToSet = this.addTimesToSet.bind(this);
  }

  addTimesToSet(times) {
    let newSetTimes = this.state.setTimes;
    newSetTimes[this.state.setCounter] = times;
    this.setState({
      setTimes: newSetTimes,
      setCounter: this.state.setCounter + 1
    });
  }

  nextMonth() {
    if (this.state.currentMonth === 11) {
      this.setState({
        currentYear: this.state.currentYear + 1
      });
    }

    this.setState({
      currentMonth: (this.state.currentMonth + 1) % 12
    });
  }

  prevMonth() {
    if (this.state.currentMonth === 0) {
      this.setState({
        currentYear: this.state.currentYear - 1
      });
    }
    this.setState({
      currentMonth: (this.state.currentMonth + 11) % 12
    });
  }

  createSetOfDay() {
    let setOfDay = {};
    let { currentYear, currentMonth } = this.state;
    let daysInCurrentMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      let date = new Date(currentYear, currentMonth, i);
      setOfDay[date] = 0;
    }
    return setOfDay;
  }

  addDayToSet(date) {
    let newSetOfDay = this.state.setOfDay;
    newSetOfDay[date] = this.state.setCounter;
    this.setState({ setOfDay: newSetOfDay });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let newEvent = {};
    newEvent.title = this.state.title;
    newEvent.description = this.state.description;
    newEvent.participants = [];
    // newEvent.allowedPreferences = this.state.allowedPreferences;
    newEvent.allowedPreferences = ['activity', 'food'];
    newEvent.availableSlots = [];
    for (let day in this.state.setOfDay) {
      let set = this.state.setOfDay[day];
      if (set) {
        let startAndEndHours = this.state.setTimes[set];
        let timeSlot = {
          startTime: new Date(
            startAndEndHours.startTime * 60 * 60 * 1000 +
              new Date(day).getTime()
          ),
          endTime: new Date(
            startAndEndHours.endTime * 60 * 60 * 1000 + new Date(day).getTime()
          )
        };
        newEvent.availableSlots.push(timeSlot);
      }
    }
    axios.post('/api/event', newEvent).then(({ data }) => {
      console.log(data);
      this.setState({ eventId: data.id });
    });
  }
  render() {
    if (this.state.eventId) {
      return (
        <div>
          This is your link: http://localhost:3000/api/event/
          {this.state.eventId}
        </div>
      );
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Event Title:
            <input name="title" onChange={this.handleChange} />
            Event Description:
            <input name="description" onChange={this.handleChange} />
            {/* Event Allowed Preferences:
        <input name="allowedPreferences" onChange={this.handleChange} /> */}
          </label>
          <DayPicker
            currentYear={this.state.currentYear}
            currentMonth={this.state.currentMonth}
            addDayToSet={this.addDayToSet}
            prevMonth={this.prevMonth}
            nextMonth={this.nextMonth}
            setOfDay={this.state.setOfDay}
          />
          <ChooseHours
            setCounter={this.state.setCounter}
            setOfDay={this.state.setOfDay}
            finalizeSet={this.finalizeSet}
            addTimesToSet={this.addTimesToSet}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Create;
