import React, { Component } from "react";
import Participants from "./Participants.jsx";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "../styles/eventCard.css";

class EventCard extends Component {
  constructor(props) {
		super(props);
		this.getFormattedDate = this.getFormattedDate.bind(this)
  }

  getLink(eventId) {
    let link = `${document.URL}join/${eventId}`;
    return link;
  }
	getFormattedDate(){
		const startDate = new Date(this.props.event.availableSlots[0].startTime)
		const endDate = new Date(this.props.event.availableSlots[this.props.event.availableSlots.length -1].startTime)
		const startString = new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: '2-digit'
		}).format(startDate) 
		const endString = new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: '2-digit'
		}).format(endDate);
		if(startString === endString) return startString;
		return startString + ' ~ '  + endString;
	}
	
  render() {
    return (
      <div className={styles.container}>
        <hr />
        <div className={styles.header}>
          <div
            className={styles.title}
            onClick={() => this.props.joinEventIfExists(this.props.event.id)}
          >
            {this.props.event.title}
          </div>
          <CopyToClipboard text={this.getLink(this.props.event.id)}>
          <div>

					  <img
							src="copy.png"
							className={styles.copyButton}
							title="Copy to Clipboard"
							/>
						<div className={styles.copyMessage}>Copy to Clipboard</div>
							</div>

          </CopyToClipboard>
        </div>
				<div className={styles.duration}>{
					this.getFormattedDate()
					}</div>
        <Participants participants={this.props.event.participants} />
        <div className ={styles.description}>{this.props.event.description}</div>
      </div>
    );
  }
}

export default EventCard;
