import React from 'react';
import styles from '../styles/IndividualGroupSlot.css';

class IndividualGroupSlot extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.slotContainer}>
        {this.props.selected.map((selection, index) => (
          <div
            key={index}
            className={
              selection ? styles['selected' + index] : styles.unselected
            }
          />
        ))}
      </div>
    );
  }
}
export default IndividualGroupSlot;
