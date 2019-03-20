import React, { Component } from 'react';
import Calendar from './Calendar.jsx';
import { getDaysInMonth, getMonth, getYear } from 'date-fns';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      // today: new Date(),
      // year: getYear(this.state.today),
      // month: getMonth(this.state.today),
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.renderMonth = this.renderMonth(this);
  }

  // componentDidMount() {
  //   console.log (this.state.today)
  //   console.log (getDaysInMonth(this.state.today), 'days this month');
  //   console.log (this.state.months[getMonth(this.state.today)], 'this month');
  //   console.log (getYear(this.state.today), 'year')
  // }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  previousMonth() {}

  nextMonth() {}

  renderMonth(month, year) {
    let firstDay = new Date(this.state.year, this.state.month);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Event Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <Calendar currentDate={new Date()} />
      </div>
    );
  }
}

export default Create;

{
  /* <div className={styles.calendarContainer}>
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
        </div> */
}
