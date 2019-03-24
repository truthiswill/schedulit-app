import React from 'react';
import styles from '../styles/calendar.css';
import classnames from 'classnames';
import Day from './Day.jsx';

import YearMonthHeader from './YearMonthHeader';

class DayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.renderDays = this.renderDays.bind(this);
  }

  renderDays() {
    let dayComponents = [];
    let { currentYear, currentMonth } = this.props;
    let daysInLastMonth = (new Date(currentYear, currentMonth, 0)).getDate();
    let daysInCurrentMonth = (new Date(currentYear, currentMonth + 1, 0)).getDate();
    let dayOfFirstOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    let dayOfLastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay()

    for (let i = daysInLastMonth - dayOfFirstOfMonth + 1; i <= daysInLastMonth; i++) {
      let date = new Date(currentYear, currentMonth - 1, i)
      dayComponents.push(
        <Day
          key={`last ${i}`}
          date={date}
          addDayToSet={this.props.addDayToSet}
          set={this.props.setOfDay[date]}
          currentMonth={this.props.currentMonth}
        />
      );
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      let date = new Date(currentYear, currentMonth, i);
      dayComponents.push(
        <Day
          key={`this ${i}`}
          date={date}
          addDayToSet={this.props.addDayToSet}
          set={this.props.setOfDay[date]}
          currentMonth={this.props.currentMonth}
        />
      );
    }

    if (dayOfLastDayOfMonth < 6) {
      for (let n = 1; n <= (6 - dayOfLastDayOfMonth); n++) {
        let date = new Date(currentYear, currentMonth + 1, n);
        dayComponents.push(
          <Day
            key={`next ${n}`}
            date={date}
            addDayToSet={this.props.addDayToSet}
            set={this.props.setOfDay[date]}
          />
        );
      }
    }
    return dayComponents;
  }

  render() {
    return (
      <div className={styles.calendarContainer}>
        <div className={styles.calendar}>
          <YearMonthHeader
            currentMonth={this.props.currentMonth}
            currentYear={this.props.currentYear}
            nextMonth={this.props.nextMonth}
            prevMonth={this.props.prevMonth}
          />
          <div className={styles.calendarGridContainer} >
            {this.renderDays()}
          </div>
        </div>
      </div>
    );
  }
}

export default DayPicker;
