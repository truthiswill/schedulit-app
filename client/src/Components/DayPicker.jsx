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
import styles from '../styles/calendar.css';
import classnames from 'classnames';
import Day from './Day.jsx';

import YearMonthHeader from './YearMonthHeader.jsx';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.renderDays = this.renderDays.bind(this);
  }
  renderDays() {
    let dayComponents = [];
    let { currentYear, currentMonth } = this.props;
    let daysInCurrentMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      let date = new Date(currentYear, currentMonth, i);
      dayComponents.push(
        <Day
          key={date}
          date={date}
          addDayToSet={this.props.addDayToSet}
          set={this.state.setOfDay[date]}
        />
      );
    }
    return dayComponents;
  }

  render() {
    return (
      <div className={styles.calendar}>
        <YearMonthHeader
          currentMonth={this.props.currentMonth}
          currentYear={this.props.currentYear}
          nextMonth={this.props.nextMonth}
          prevMonth={this.props.prevMonth}
        />
        {this.renderDays()}
      </div>
    );
  }
}

export default Calendar;
