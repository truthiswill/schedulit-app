import React from 'react';
import styles from '../styles/IndividualSlot.css';

class IndividualSlot extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        onMouseDown={() => this.props.handleMouseDown(this.props.slotStartTime, this.props.selected)}
        onMouseUp={this.props.handleMouseUp}
        onMouseEnter={() => this.props.handleMouseEnter(this.props.slotStartTime, this.props.selected)}
        className={`${this.props.selected ? styles.selected : ''} ${this.props.selected === null ? styles.unselectable : styles.selectable}`} >
      </ div>
    )
  }
}
export default IndividualSlot;
