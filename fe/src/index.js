import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import store from './store/index';
import Login from './containers/login/Login'
import Manage from './containers/manage/Manage';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/'exact component={Manage}></Route>
        <Route path = '/login' component={Login}></Route>
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);