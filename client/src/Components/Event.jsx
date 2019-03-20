import React from 'react';

const Event = ({ event }) => {
  return (
    <div>
      <div>{event.title}</div>
      <div>{event.participations.length} people attending</div>
    </div>
  );
};

export default Event;
