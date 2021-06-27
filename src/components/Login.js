import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    //this is a uncontrolled component form handling.
    //In these data is not managed by react state but managed by react-dom.
    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();

    //this is a controlled component form handling.
    //Mostly used.
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange = (e) => {
    //   console.log(e.target.value);
      this.setState({
          email:e.target.value
      });
  };

  handlePasswordChange = (e) => {
    // console.log(e.target.value);
    this.setState({
        password:e.target.value
    });
   };
  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log('this.emailInputRef', this.emailInputRef);
    // console.log('this.passwordInputRef', this.passwordInputRef);
    console.log('this.state',this.state);
  };
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            // ref={this.emailInputRef}
            onChange = {this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            // ref={this.passwordInputRef}
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className="field">
          <button onClick={this.handleFormSubmit}>Log In</button>
        </div>
      </form>
    );
  }
}

export default Login;
