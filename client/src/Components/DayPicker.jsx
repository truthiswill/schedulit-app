import React from 'react';
// import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, parse, subMonths, addMonths } from 'date-fns';
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
    
    for (let o = daysInLastMonth - findDay; o <= daysInLastMonth; o++) {
      if (currentMonth === 0) {
        let date = new Date (currentYear - 1, 11, o)
        console.log(date, 'date')
        dayComponents.push(
          <Day
          key={date}
          date={date}
          addDayToSet={this.props.addDayToSet}
          set={this.props.setOfDay[date]}
          />
        );
      }else {
        let date = new Date(currentYear, currentMonth - 1, o)
        console.log (date, 'date')
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
    return dayComponents;
  };

  render() {
    return (
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
    );
  };
}

export default DayPicker;