import React from 'react';
import Event from './Event.jsx';

const Events = ({ events }) => {
  return (
    <div>
      {events.map((event, index) => {
        return <Event event={event} key={index} />;
      })}
    </div>
  );
};

export default Events;
