import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      typedMessage: '',
    };
    this.socket = io.connect('http://localhost:5000/');
    this.userEmail = props.user.email;

    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;
    this.socket.on('connect', function () {
      console.log('socket connection established');
      socketConnection.emit('join_room', {
        user_email: this.userEmail,
        chatroom: 'connect',
      });
      socketConnection.on('user_joined', function (data) {
        console.log('new user joined', data);
      });
    });

    this.socket.on('receive_message', function (data) {
      //add message to state.
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;
      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }

      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };

  handleSubmit = () => {
    const { typedMessage } = this.state;
    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        minimize:true,
        chatroom: 'connect',
      });
    }
  };

  handleClick = () => {
    const {minimize} = this.state;
    this.setState({
      minimize : !minimize
    });
  }
  render() {
    const { typedMessage, messages,minimize } = this.state;
    console.log('state in chat',this.state);
    return (
      <div className="chat-container" style={minimize?{height:45}:{height:400}}>
        <div className="chat-header" onClick={this.handleClick}>
          Group Chat
          <img
            src="https://image.flaticon.com/icons/png/512/1665/1665765.png"
            alt=""
            height={17}
          />
        </div>
        <div className="chat-messages">
          {messages.map((message) => {
           return ( <div
              className={
                message.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>
           );
          })}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Chat);
