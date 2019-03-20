import React from 'react';
import {format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, parse, subMonths, addMonths} from 'date-fns';
import styles from '../../dist/styles/calendar.css';
import classnames from 'classnames';
import Day from './Day.jsx';

import CalendarHeader from './CalendarHeader';

class Calendar extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
			currentMonth: this.props.currentDate.getMonth(),
			currentYear: this.props.currentDate.getYear(),
      selectedDates: []
    }
    this.renderCells = this.renderCells.bind(this);
    this.onDateClick = this.onDateClick.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }

<<<<<<< HEAD
  renderCells () {
		let dayComponents = [];
		let {currentYear, currentMonth} = this.state;
		let daysInCurrentMonth = (new Date(currentYear, currentMonth+1, 0)).getDate();
		for(let i=1; i<=daysInCurrentMonth; i++){
			dayComponents.push(
				<Day 
					date={new Date(currentYear, currentMonth, i)}
				/>
			);
		}
		return dayComponents;
=======
  renderHeader () {
    const dateFormat = 'MMMM YYYY';
    return (
      <div className={classnames(styles.header, styles.row, styles.middle)}>
        <div className={classnames(styles.col, styles.colStart)}>
          <div className={styles.icon} onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className={classnames(styles.col, styles.colCenter)}>
          <span> {format(this.state.currentMonth, dateFormat)} </span>
        </div>
        <div className={classnames(styles.col, styles.colEnd)} onClick={this.nextMonth}>
          <div className={styles.icon}>chevron_right</div>
        </div>
      </div>
    );  
  }

  renderDays () {
    const dateFormat = 'dddd';
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      console.log(format(addDays(startDate, i), dateFormat), 'format')
      days.push (
        <div className={classnames(styles.col, styles.colCenter)} key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    };
    return <div className={classnames(styles.days, styles.row)}>{days}</div>
  }

  renderCells () {
    const {currentMonth, selectedDate} = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push (
          <div 
          // className={`col cell ${!isSameMonth(day, monthStart) ? "disabled" : isSameDay(day, selectedDate) ? "selected" : ""}`}
            key={day}
            onClick={() => this.onDateClick(parse(cloneDay))}>
            <span className={classnames(styles.number, styles.bg)}>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push (
        <div className={styles.row} key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className={styles.body}>{rows}</div>
>>>>>>> e7f83b391db9065265eb0e834de670b8f951e6bf
  };

  onDateClick (day) {
    this.setState({
      selectedDate: day
    })
  }

  nextMonth () {
    this.setState ({
      currentMonth: addMonths(this.state.currentMonth, 1)
    })
  };

  prevMonth () {
    this.setState ({
      currentMonth: subMonths(this.state.currentMonth, 1)
    })
  };

  render () {
    return (
      <div className={styles.calendar}>
        <CalendarHeader currentMonth={this.state.currentMonth} currentYear={this.state.currentYear} nextMonth={this.nextMonth} prevMonth={this.prevMonth} />
        {this.renderCells()}
      </div>
    );
  };
}

export default Calendar;