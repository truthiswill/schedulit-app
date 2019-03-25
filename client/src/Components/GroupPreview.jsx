import React from "react";
import Legend from './Legend'
import GroupTimeSlot from "./GroupTimeSlot";
import TimeAxis from "./TimeAxis";


import styles from "../styles/GroupPreview.css";
class GroupPreview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Everyone's Availability </div>
        <div className={styles.timeSlotContainer}>
          <TimeAxis
            earliestMinutesInDay={this.props.earliestMinutesInDay}
            latestMinutesInDay={this.props.latestMinutesInDay}
            numberOfSlots={this.props.eventData.availableSlots.length}
          />
          {this.props.eventData.availableSlots.map((timeSlot, index) => {
            return (
              <GroupTimeSlot
                earliestMinutesInDay={this.props.earliestMinutesInDay}
                latestMinutesInDay={this.props.latestMinutesInDay}
                timeSlot={timeSlot}
                eventData={this.props.eventData}
                key={index}
              />
            );
          })}
        </div>
        <Legend participations={this.props.eventData.participations} />
      </div>
    );
  }
}
export default GroupPreview;
