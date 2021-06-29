import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as jwtDecode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Signup , Settings ,UserProfile} from './';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

const PrivateRoute = (privateRouteToProps) => {
  const { isLoggedIn, path, component: Component } = privateRouteToProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? <Component {...props} /> : <Redirect to={{
          pathname : '/login',
          state : {
            from : props.location
          }
        }} />;
      }}
    />
  );
};
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = getAuthTokenFromLocalStorage();
    if (token) {
      const user = jwtDecode(token);
      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          name: user.name,
          _id: user._id,
        })
      );
    }
  }

  render() {
    const { posts, auth } = this.props;
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
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedIn={auth.isLoggedIn}
            />
            <PrivateRoute 
              path="/user/:userId"
              component={UserProfile}
              isLoggedIn={auth.isLoggedIn}
            />
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
    auth: state.auth,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
