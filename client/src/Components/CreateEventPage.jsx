import React, { Component } from "react";
import DayPicker from "./DayPicker.jsx";
import ChooseHours from "./ChooseHours";
import axios from "axios";
import styles from "../styles/CreateEventPage.css";

class CreateEventPage extends Component {
  constructor(props) {
    super(props);
    let currentDate = new Date();
    this.state = {
      setCounter: 1,
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear(),
      setTimes: {},
      readyForSubmit: false
    };
    this.state.setOfDay = this.createSetOfDay();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addDayToSet = this.addDayToSet.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.addTimesToSet = this.addTimesToSet.bind(this);
    this.instructionMessage = this.instructionMessage.bind(this);
    this.isReadyForSubmit = this.isReadyForSubmit.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.showHours = this.showHours.bind(this);
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
    if (date.getTime() + 24 * 60 * 60 * 1000 > new Date()) {
      let newSetOfDay = this.state.setOfDay;
      if (this.state.setOfDay[date] === 0) {
        newSetOfDay[date] = this.state.setCounter;
      } else {
        newSetOfDay[date] = 0;
      }
      this.setState({ setOfDay: newSetOfDay });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  instructionMessage() {
    if (!this.state.title) return "Step 1: Enter a Title";
    if (this.state.title && !this.state.description)
      return "Step 2: Enter a Description for your Event";
    if (
      this.state.title &&
      this.state.description &&
      !(Object.keys(this.state.setTimes) > 0)
    ) {
      return "Step 3: Pick Dates & Times for Your Event";
    }
    if (
      this.state.title &&
      this.state.description &&
      Object.keys(this.state.setTimes) > 0
    ) {
      return "Step 4: Submit Event if Ready or Choose Additional Dates";
    }
  }

  isReadyForSubmit() {
    if (
      this.state.title &&
      this.state.description &&
      Object.keys(this.state.setTimes).length > 0
    ) {
      return (
        <input type="submit" value="Submit" className={styles.submitButton} />
      );
    }
  }

  showCalendar() {
    if (this.state.title && this.state.description) {
      return (
        <DayPicker
          currentYear={this.state.currentYear}
          currentMonth={this.state.currentMonth}
          addDayToSet={this.addDayToSet}
          prevMonth={this.prevMonth}
          nextMonth={this.nextMonth}
          setOfDay={this.state.setOfDay}
        />
      );
    }
  }

  showHours() {
    if (this.state.title && this.state.description) {
      return (
        <ChooseHours
          setCounter={this.state.setCounter}
          setOfDay={this.state.setOfDay}
          finalizeSet={this.finalizeSet}
          addTimesToSet={this.addTimesToSet}
        />
      );
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let newEvent = {};
    newEvent.title = this.state.title;
    newEvent.description = this.state.description;
    newEvent.participants = [];
    newEvent.allowedPreferences = ["activity", "food"];
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
    axios.post("/api/event", newEvent).then(({ data }) => {
      this.setState({ eventId: data.id });
    });
  }
  render() {
    if (this.state.eventId) {
      return (
        <div style={{display: 'flex', padding: '5em 23em'}}>
				<div style={{padding: '0em 0.5em'}}>
					{`This is your link: `}

				</div>
          <a href={"/join/" + this.state.eventId}>
            http://localhost:3000/join/{this.state.eventId}{" "}
          </a>
        </div>
      );
    }

    return (
      <div className={styles.createPage}>
        <div className={styles.eventInvitation}>
          {this.instructionMessage()}
        </div>
        <div className={styles.createContainer}>
          <div className={styles.detailsContainer}>
            <div className={styles.inputFormContainer}>
              <form onSubmit={this.handleSubmit}>
                <label className={styles.eventForm}>
                  <input
                    name="title"
                    type="text"
                    placeholder="Event Title"
                    onChange={this.handleChange}
                    className={styles.input}
                  />
                  <input
                    name="description"
                    type="text"
                    placeholder="Event Description"
                    onChange={this.handleChange}
                    className={styles.input}
                  />
                </label>
                <div className={styles.hoursContainer}>{this.showHours()}</div>
                {this.isReadyForSubmit()}
              </form>
            </div>
          {this.showCalendar()}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEventPage;
