import React, { Component } from 'react';
import styles from '../styles/create.css';
import DayPicker from './DayPicker.jsx'
import { getDaysInMonth, getMonth, getYear } from 'date-fns';

class Create extends Component {
  constructor(props) {
    super(props);
    let currentDate = new Date();
    this.state = {
      setCounter: 1,
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear(),

    };
    this.state.setOfDay = this.createSetOfDay();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addDayToSet = this.addDayToSet.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
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

  finalizeSet() {
    // choose times
    this.setState({ setCounter: setCounter + 1 });
  }

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
          <input type="submit" value="Submit" />
        </form>
        <DayPicker
          currentYear={this.state.currentYear}
          currentMonth={this.state.currentMonth}
          addDayToSet={this.addDayToSet}
          prevMonth={this.prevMonth}
          nextMonth={this.nextMonth}
          setOfDay={this.state.setOfDay}
        />
      </div >
    );
  }
}

export default Create;


{/* <div className={styles.calendarContainer}>
          <div className={styles.calendar}>
          <h3 className={styles.calendarHeader}></h3>
          <table className={styles.calendarBorder}>
            <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
            </thead>
            <tbody className={styles.calendarBody}>
            </tbody>
          </table>

          <div className={styles.calendarButtons}>
            <button className={styles.previousMonth} onClick={this.previousMonth()}>Previous</button>
            <button className={styles.nextMonth} onClick={this.nextMonth()}>Next</button>
          </div>
          <br/>
          </div> 
        </div> */}