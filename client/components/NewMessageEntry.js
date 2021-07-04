import React, { Component } from "react";
import { connect } from "react-redux";
import { writeMessage, postMessage } from "../store";

class NewMessageEntry extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.write(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();

    const content = this.props.newMessageEntry;
    const channelId = this.props.channelId;

    this.props.post({ content, channelId });
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.props.newMessageEntry}
            onChange={this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return { newMessageEntry: state.newMessageEntry };
};

const mapDispatchToProps = (dispatch) => {
  return {
    write: (string) => dispatch(writeMessage(string)),
    post: (message) => dispatch(postMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry);
