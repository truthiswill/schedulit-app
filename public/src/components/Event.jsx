import React from 'react';

const Event = props => {
  return <div onClick={props.changeDetailView}>{props.event}</div>;
};

export default Event;
