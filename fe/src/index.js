import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store/index';
import App from './containers/App/app'
import bindLogin from './containers/bindLogin/bindLogin'
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/'exact component={App}></Route>
        <Route path = '/login' component={bindLogin}></Route>
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);