import React from 'react';
import styles from '../styles/IndividualGroupSlot.css';

import GroupTimeSlot from './GroupTimeSlot';

class GroupPreview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.eventData === undefined) return <div />;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {
          this.props.eventData.availableSlots.map(timeSlot => {
            return (
              <GroupTimeSlot
                earliestMinutesInDay={this.props.earliestMinutesInDay}
                latestMinutesInDay={this.props.latestMinutesInDay}
                timeSlot={timeSlot}
                eventData={this.props.eventData}
              />
            );
          })
        }
      </div >
    )
  }
}
export default GroupPreview;