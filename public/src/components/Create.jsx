import React, { Component } from 'react';
import styles from '../styles/Create.css';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: ''
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
  }

  render() {
    return (
      <div className={styles.container}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Event Name:
            <input name="event" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Create;
