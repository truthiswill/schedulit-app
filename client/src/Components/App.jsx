import React, { Component } from 'react';
import Events from './Events.jsx';
import Create from './Create.jsx';
import { getMonth, getDate, setMonth, getDay } from 'date-fns';
import Cookies from 'js-cookie';
import axios from 'axios';
import JoinEvent from './JoinEvent'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: true,
      events: ['event1', 'event2', 'event3']
    };
    let eventId = Cookies.get('eventId');
    this.joinEventIfExists(eventId);
    this.changeView = this.changeView.bind(this);
    // let eventId = document.cookie.slice(document.cookie.indexOf('eventId=');
  }

  joinEventIfExists(eventId) {
    if (eventId) {
      axios.get('/api/event/' + eventId).then(({ data }) => {
        Cookies.remove('eventId');
        console.log(Cookies.get('eventId'));
        console.log(data);
        data.availableSlots = data.availableSlots.map(timeSlot => {
          return {
            startTime: new Date(timeSlot.startTime),
            endTime: new Date(timeSlot.endTime)
            // not including preference level as not meaningful
          };
        });
        this.setState(
          { eventData: data }
        )
      }).catch(() => console.log('i guess it was an error'));
    }
  }

  componentDidMount() {
    let today = Date();
    console.log(today)
    console.log(getDate(today), 'day in the week')
  }

  changeView() {
    this.setState({ view: !this.state.view });
  }

  render() {
    let { events, view, eventData } = this.state;
    if (eventData !== undefined) return <JoinEvent eventData={eventData} />
    return (
      <div>
        <button onClick={this.changeView}>+</button>
        <div>{view ? <Events events={events} /> : <Create />}</div>
      </div>
    );
  }
}

export default App;