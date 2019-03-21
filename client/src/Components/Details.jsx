import React from 'react';

const Details = ({ currentEvent }) => {
  return (
    <div>
      <div>{currentEvent.title}</div>
      <div>{currentEvent.description}</div>
      <div>{currentEvent.participations}</div>
      <div>{currentEvent.availableSlots}</div>
    </div>
  );
};

export default Details;
