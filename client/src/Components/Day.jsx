import React from 'react';

class Day extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div onClick={() => this.onDateClick(parse(cloneDay))}>
        <span className={styles.number}>{this.props.date.getDate()}</span>
      </div>
    );
  }
}

export default Day;
