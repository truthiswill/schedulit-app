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
    let findDay = new Date(currentYear, currentMonth, 1).getDay() - 1
    let findLastDay = new Date(currentYear, currentMonth + 1, 0).getDay()

    for (let o = daysInLastMonth - findDay; o <= daysInLastMonth; o++) {
      let date = new Date(currentYear, currentMonth - 1, o)
      dayComponents.push(
        <Day
          key={date}
          date={date}
          addDayToSet={this.props.addDayToSet}
          set={this.props.setOfDay[date]}
        />
      );
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      let date = new Date(currentYear, currentMonth, i);
      dayComponents.push(
        <Day
          key={date}
          date={date}
          addDayToSet={this.props.addDayToSet}
          set={this.props.setOfDay[date]}
        />
      );
    }

    if (findLastDay < 6) {
      for (let n = 1; n <= (6 - findLastDay); n++) {
        let date = new Date(currentYear, currentMonth + 1, n);
        dayComponents.push(
          <Day
            key={date}
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
