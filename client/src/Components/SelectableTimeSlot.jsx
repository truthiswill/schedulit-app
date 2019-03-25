import React from 'react';
import SelectableTimeUnit from './SelectableTimeUnit';
import styles from '../styles/SelectableTimeSlot.css'



class SelectableTimeSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      mouseDown: false,
    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  handleMouseDown(timestamp, selected) {
    if (selected !== null) {
      this.props.updateTimeSlotStatus(timestamp, selected ? false : true);
      this.setState({
        mouseDown: true,
        startTimestamp: timestamp
      });
    }
  }

  handleMouseEnter(timestamp, selected) {
    if (this.state.mouseDown) {
      this.props.updateTimeSlotStatus(timestamp, selected ? false : true);
    }
  }

  handleMouseUp(e) {
    this.setState({ mouseDown: false });
  }

  render() {
    return (
			<div className={styles.container} >
			<div className={styles.date}>

        {new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: '2-digit'
        }).format(this.props.timeSlot.startTime)}
			</div>
        {Object.keys(this.props.slotStatus).map((timeStamp, index) => <SelectableTimeUnit
          selected={this.props.slotStatus[timeStamp]}
          handleMouseDown={this.handleMouseDown}
          handleMouseEnter={this.handleMouseEnter}
          handleMouseUp={this.handleMouseUp}
          slotStartTime={timeStamp}
          startFromHere={this.startFromHere}
          goToHere={this.goToHere}
          key={index}
          includeHere={this.includeHere}
        />)}
      </div >
    );
  }
}

export default SelectableTimeSlot;
