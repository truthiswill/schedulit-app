import React from 'react';
import IndividualSlot from './IndividualSlot';
import { interfaceDeclaration } from '@babel/types';
import styles from '../styles/HourDescription.css';

class HourDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      mouseDown: false,
      slotStatus: this.initializeSlotStatus()
    };
    this.startFromHere = this.startFromHere.bind(this);
    this.goToHere = this.goToHere.bind(this);
    this.includeHere = this.includeHere.bind(this);
  }

  timestampLiesInSlot(timestamp, timeSlot) {
    return timestamp >= timeSlot.startTime && timestamp <= timeSlot.endTime;
  }

  initializeSlotStatus() {
    let numberOfSlots =
      (this.props.latestMinutesInDay - this.props.earliestMinutesInDay) / 15;
    let slotStatus = {}; //keys are timestamps; val is true/false for selectable, null for unselectable
    let stub = new Date(
      this.props.timeSlot.startTime.getFullYear(),
      this.props.timeSlot.startTime.getMonth(),
      this.props.timeSlot.startTime.getDate()
    ).getTime();
    for (let i = 0; i < numberOfSlots; i++) {
      let currentTimeStamp = new Date(
        stub + (this.props.earliestMinutesInDay + i * 15) * 60 * 1000
      );
      if (
        currentTimeStamp >= this.props.timeSlot.startTime &&
        currentTimeStamp < this.props.timeSlot.endTime
      ) {
        slotStatus[
          currentTimeStamp
        ] = this.props.eventData.participations[0].timeAvailable.some(
          timeSlot => this.timestampLiesInSlot(currentTimeStamp, timeSlot)
        );
      } else {
        slotStatus[currentTimeStamp] = null;
      }
    }
    return slotStatus;
  }

  //fix these next 3 functions

  startFromHere(slotStartTime) {
    if (this.state.slotStatus[slotStartTime] !== null) {
      this.state.slotStatus[slotStartTime] = true;
      this.setState({
        startTime: slotStartTime,
        mouseDown: true,
        slotStatus: this.state.slotStatus
      });
    }
  }

  goToHere(slotStartTime) {
    if (this.state.slotStatus[slotStartTime] !== null) {
      // let newTimeSlot = {};
      // newTimeSlot.startTime = new Date(this.state.startTime);
      // newTimeSlot.endTime = new Date(new Date(slotStartTime).getTime() + (15 * 60 * 1000));
      // newTimeSlot.preferenceLevel = 1;
      // console.log('newTimeSlot', newTimeSlot);
      // this.props.addToTimeAvailable(newTimeSlot);
      this.props.updateTimeSlotStatus(this.props.id, this.state.slotStatus);
      this.setState({ mouseDown: false });
    }
  }

  includeHere(slotStartTime) {
    if (this.state.slotStatus[slotStartTime] !== null) {
      if (this.state.mouseDown) {
        for (let timestamp in this.state.slotStatus) {
          //in case of skipped elements when drag is fast
          if (
            new Date(timestamp) < new Date(slotStartTime) &&
            new Date(timestamp) > new Date(this.state.startTime)
          ) {
            this.state.slotStatus[timestamp] = true;
          }
        }
        this.state.slotStatus[slotStartTime] = true;
        this.setState({ slotStatus: this.state.slotStatus });
      }
    }
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>TIME</div>
        {Object.keys(this.state.slotStatus).map((timeStamp, index) => {
          timeStamp = new Date(timeStamp);
          if (timeStamp.getMinutes() === 0 || index === 0) {
            return (
              <div className={styles.showHour}>
                <div className={styles.internalPadding}>
                  {new Intl.DateTimeFormat('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }).format(timeStamp)}
                </div>
              </div>
            );
          } else if (Object.keys(this.state.slotStatus).length - 1 === index) {
            return (
              <div>
                <div className={styles.hideHour} />
                <div className={styles.showLast}>
                  <div className={styles.internalPadding}>
                    {new Intl.DateTimeFormat('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(new Date(timeStamp.getTime() + 15 * 60000))}
                  </div>
                </div>
              </div>
            );
          } else {
            return <div className={styles.hideHour} />;
          }
        })}
      </div>
    );
  }
}

export default HourDescription;
