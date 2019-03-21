import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    console.log(this.state.event);
    e.preventDefault();
    axios.post('/api/event', this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Event Title:
          <input name="title" onChange={this.handleChange} />
          Event Description:
          <input name="description" onChange={this.handleChange} />
          Event Available Slots:
          <input name="availableSlots" onChange={this.handleChange} />
          Event Allowed Preferences:
          <input name="allowedPreferences" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Create;
