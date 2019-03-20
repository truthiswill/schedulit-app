import React from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, parse, subMonths, addMonths } from 'date-fns';
import styles from '../../dist/styles/calendar.css';
import classnames from 'classnames';
import Day from './Day.jsx';

import CalendarHeader from './CalendarHeader';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: this.props.currentDate.getMonth(),
      currentYear: this.props.currentDate.getYear(),
      setCounter: 1
    }
    this.state.setOfDay = this.createSetOfDay();
    this.renderDays = this.renderDays.bind(this);
    this.onDateClick = this.onDateClick.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.addDayToSet = this.addDayToSet.bind(this);
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

  finalizeSet() {
    // choose times
    this.setState({ setCounter: setCounter + 1 });
  }


  renderDays() {
    let dayComponents = [];
    let { currentYear, currentMonth } = this.state;
    let daysInCurrentMonth = (new Date(currentYear, currentMonth + 1, 0)).getDate();
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      let date = new Date(currentYear, currentMonth, i);

      dayComponents.push(
        <Day
          date={date}
          addDayToSet={this.addDayToSet}
          set={this.state.setOfDay[date]}
        />
      );
    }
    return dayComponents;
  };

  onDateClick(day) {
    this.setState({
      selectedDate: day
    })
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



  render() {
    console.log(this.state.setOfDay);
    return (
      <div className={styles.calendar}>
        <CalendarHeader currentMonth={this.state.currentMonth} currentYear={this.state.currentYear} nextMonth={this.nextMonth} prevMonth={this.prevMonth} />
        {this.renderDays()}
      </div>
    );
  };
}

export default Calendar;