import React from 'react';
import Event from './Event.jsx';

const Events = props => {
  return (
    <div>
      {props.events.map((event, index) => (
        <Event
          event={event}
          key={index}
          changeDetailView={props.changeDetailView}
        />
      ))}
    </div>
  );
};

export default Events;
