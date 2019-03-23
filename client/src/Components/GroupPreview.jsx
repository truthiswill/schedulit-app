import React from 'react';

import GroupTimeSlot from './GroupTimeSlot';

class GroupPreview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {
          this.props.eventData.availableSlots.map((timeSlot, index) => {
            return (
              <GroupTimeSlot
                earliestMinutesInDay={this.props.earliestMinutesInDay}
                latestMinutesInDay={this.props.latestMinutesInDay}
                timeSlot={timeSlot}
                eventData={this.props.eventData}
                key={index}
              />
            );
          })
        }
      </div >
    )
  }
}
export default GroupPreview;