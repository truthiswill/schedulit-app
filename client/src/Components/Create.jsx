import React, { Component } from 'react';
import DayPicker from './DayPicker.jsx'
import ChooseHours from './ChooseHours';

class Create extends Component {
  constructor(props) {
    super(props);
    let currentDate = new Date();
    this.state = {
      setCounter: 1,
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getYear(),
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
      })
    }

    this.setState({
      currentMonth: (this.state.currentMonth + 1) % 12
    })

  };

  prevMonth() {
    if (this.state.currentMonth === 0) {
      this.setState({
        currentYear: this.state.currentYear - 1
      })
    }
    this.setState({
      currentMonth: (this.state.currentMonth + 11) % 12
    });
  };


  createSetOfDay() {
    let setOfDay = {};
    let { currentYear, currentMonth } = this.state;
    let daysInCurrentMonth = (new Date(currentYear, currentMonth + 1, 0)).getDate();
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
    console.log(this.state.event);
    e.preventDefault();
    axios.post('/api/event', this.state);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Event Title:
        <input name="title" onChange={this.handleChange} />
            Event Description:
        <input name="description" onChange={this.handleChange} />
            Event Available Slots:
        <input name="availableSlots" onChange={this.handleChange} />
            Event Allowed Preferences:
        <input name="allowedPreferences" onChange={this.handleChange} />
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
      </div >
    );
  }
}

export default Create;

