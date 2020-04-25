import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store/index';
import Login from './containers/login/Login'
import App from './containers/App/app'
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={App}></Route>
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);