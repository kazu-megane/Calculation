// import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthProvider from './auth/AuthProvider';
import PrivateRoute from './auth/PrivateRoute';
import Home from './components/Home';
import SignUp from './auth/SignUp';
import Login from './auth/Login';
import './App.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
