import React from 'react';
import styles from '../styles/IndividualSlot.css';


class IndividualSlot extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <div
        onMouseDown={() => this.props.startFromHere(this.props.slotStartTime)}
        onMouseUp={() => this.props.goToHere(this.props.slotStartTime)}
        onMouseEnter={() => this.props.includeHere(this.props.slotStartTime)}
        className={`${this.props.selected ? styles.selected : ''} ${this.props.selected === null ? styles.unselectable : styles.selectable}`} >
      </ div>
    )
  }
}
export default IndividualSlot;