import React from 'react';
import {format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, parse, subMonths, addMonths} from 'date-fns';
import styles from '../../dist/styles/calendar.css';
import classnames from 'classnames';

class Calendar extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      currentMonth: new Date (),
      selectedDate: new Date(),
    }
    this.renderHeader = this.renderHeader.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.renderCells = this.renderCells.bind(this);
    this.onDateClick = this.onDateClick.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }

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
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  };
}

export default Calendar;