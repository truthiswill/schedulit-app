import React from 'react';
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  parse,
  subMonths,
  addMonths
} from 'date-fns';
import classnames from 'classnames';
import Day from './Day.jsx';

import CalendarHeader from './CalendarHeader';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: this.props.currentDate.getMonth(),
      currentYear: this.props.currentDate.getYear(),
      selectedDates: []
    };
    this.renderCells = this.renderCells.bind(this);
    this.onDateClick = this.onDateClick.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }

  renderCells() {
    let dayComponents = [];
    let { currentYear, currentMonth } = this.state;
    let daysInCurrentMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      dayComponents.push(<Day date={new Date(currentYear, currentMonth, i)} />);
    }
    return dayComponents;
  }

  onDateClick(day) {
    this.setState({
      selectedDate: day
    });
  }

  nextMonth() {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  }

  prevMonth() {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  }

  render() {
    return (
      <div className={styles.calendar}>
        <CalendarHeader
          currentMonth={this.state.currentMonth}
          currentYear={this.state.currentYear}
          nextMonth={this.nextMonth}
          prevMonth={this.prevMonth}
        />
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
