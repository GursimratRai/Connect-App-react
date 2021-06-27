import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import {Home, Navbar, Page404 } from './';

//dummy functions for making routing controllers.
const Login = () => {
  return <div>LOGIN</div>;
};
const Signup = () => {
  return <div>SIGN UP</div>;
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    console.log('props', this.props);
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route
              exact
              path="/"
              //use render instead of component to pass props as argument.
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
