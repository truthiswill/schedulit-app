import React from 'react';
import styles from '../styles/GroupTimeUnit.css';


class GroupTimeUnit extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={styles.slotContainer} >
        {this.props.selected.map((selection, index) => <div key={index} className={selection ? styles['selected' + index] : styles.unselected}></div>)}
      </ div>
    )

  }
}
export default GroupTimeUnit;