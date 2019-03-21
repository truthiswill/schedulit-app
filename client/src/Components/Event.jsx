import React from 'react';

const Event = ({ event, changeDetailView }) => {
  return (
    <div>
      <div onClick={() => changeDetailView(event.id)}>{event.title}</div>
      <div>{event.participations.length} people attending</div>
    </div>
  );
};

export default Event;
