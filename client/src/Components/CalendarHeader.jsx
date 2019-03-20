import React from 'react';
import classnames from 'classnames';
import styles from '../../dist/styles/calendar.css';
import {format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, parse, subMonths, addMonths} from 'date-fns';

const renderDays = () => {

	const DAYSOFWEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const days = [];


	for (let day of DAYSOFWEEK) {
		days.push (
			<div className={classnames(styles.col, styles.colCenter)} key={day}>
				{day}
			</div>
		);
	};
	return <div className={classnames(styles.days, styles.row)}>{days}</div>
}

export default (props) => {
	const dateFormat = 'MMMM YYYY';
	return (
		<>
		<div className={classnames(styles.header, styles.row, styles.middle)}>
			<div className={classnames(styles.col, styles.colStart)}>
				<div className={styles.icon} onClick={props.prevMonth}>
					chevron_left
				</div>
			</div>
			<div className={classnames(styles.col, styles.colCenter)}>
				<span> {props.currentMonth} {props.currentYear} </span>
			</div>
			<div className={classnames(styles.col, styles.colEnd)} onClick={props.nextMonth}>
				<div className={styles.icon}>chevron_right</div>
			</div>
		</div>
		{renderDays()}
		</>
	);  
};

