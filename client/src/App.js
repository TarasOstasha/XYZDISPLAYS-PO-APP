import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import React, { useState } from 'react';
import GuardedRoute from './pages/Auth/GuardedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const onSubmit = ({login, password}) => {

    const ifValid = {
        login: 'xyz',
        password: '1111'
    }
    const isValidLogin = login === ifValid.login && password === ifValid.password;
    // isValidLogin ? setIsLoggedIn(true) : setIsLoggedIn(false)
    if(isValidLogin) {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setIsLoggedIn(false);
      setLoginError(true);
    }

  };  
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/">
          <Home />
        </Route> */}
        <GuardedRoute exact path="/" component={Home} isAuthenticated={isLoggedIn} />
        <Route exact path="/auth">
          {isLoggedIn ? <Redirect to="/" /> : <Auth onSubmit={onSubmit} loginError={loginError} />}
        </Route>
        {/* <Route path="/users/:id">
          <UserProfile />
        </Route> */}
      </Switch>
    </Router>
  )
}

export default App
