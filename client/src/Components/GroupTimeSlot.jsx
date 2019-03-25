import React from "react";
import GroupTimeUnit from "./GroupTimeUnit";

import styles from "../styles/GroupTimeSlot.css";

class GroupTimeSlot extends React.Component {
  constructor(props) {
    super(props);
    this.getSlotStatus = this.getSlotStatus.bind(this);
  }

  timestampLiesInSlot(timestamp, timeSlot) {
    timestamp = new Date(timestamp);
    return (
      timestamp.getTime() >= timeSlot.startTime.getTime() &&
      timestamp.getTime() < timeSlot.endTime.getTime()
    );
  }

  getSlotStatus() {
    let slotStatus = {}; //keys are timestamps; val is true/false for selectable, null for unselectable
    let numberOfSlots =
      (this.props.latestMinutesInDay - this.props.earliestMinutesInDay) / 15;
    let stub = new Date(
      this.props.timeSlot.startTime.getFullYear(),
      this.props.timeSlot.startTime.getMonth(),
      this.props.timeSlot.startTime.getDate()
    ).getTime();
    for (let i = 0; i < numberOfSlots; i++) {
      let currentTimeStamp = new Date(
        stub + (this.props.earliestMinutesInDay + i * 15) * 60 * 1000
      );
      let userAvailabilities = [];
      for (let participation of this.props.eventData.participations) {
        let isAvailable = participation.timeAvailable.some(timeSlot =>
          this.timestampLiesInSlot(currentTimeStamp, timeSlot)
        );
        userAvailabilities.push(isAvailable);
      }
      slotStatus[currentTimeStamp] = userAvailabilities;
    }
    return slotStatus;
  }

  render() {
    let slotStatus = this.getSlotStatus();
    return (
      <div className={styles.container}>
        <div className={styles.date}>
          {new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit"
          }).format(this.props.timeSlot.startTime)}
        </div>
				<div>

        {Object.keys(slotStatus).map((timeStamp, index) => (
					<GroupTimeUnit
					selected={slotStatus[timeStamp]}
					slotStartTime={timeStamp}
					key={index}
          />
					))}
					</div>
      </div>
    );
  }
}

export default GroupTimeSlot;
