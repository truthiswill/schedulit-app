import React from 'react';
import Event from './Event.jsx';

const Events = ({ events, changeDetailView }) => {
  return (
    <div>
      {events.map((event, index) => {
        return (
          <Event
            event={event}
            key={index}
            changeDetailView={changeDetailView}
          />
        );
      })}
    </div>
  );
};

export default Events;
