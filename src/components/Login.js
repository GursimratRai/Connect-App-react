import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {clearAuthState, login} from '../actions/auth';

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

  componentWillUnmount(){
    this.props.dispatch(clearAuthState());
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
    const {email,password} = this.state;
    if(email && password){
      this.props.dispatch(login(email,password));
    }
  };

  render() {
    const {error,inProgress,isLoggedIn} = this.props.auth;
    const {from} = this.props.location.state || {from:{pathname:'/'}};
    if(isLoggedIn){
      return <Redirect to={from} />
    }

    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className='alert error-dailog'>{error}</div>}
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
          {inProgress ? 
          (<button disabled={inProgress} >Logging in...</button>)
          :
          (<button onClick={this.handleFormSubmit} disabled={inProgress} >Log In</button>)
          }
        </div>
      </form>
    );
  }
}

function mapStateToProps(state){
  return {
    auth:state.auth
  }
}
export default connect(mapStateToProps)(Login);
