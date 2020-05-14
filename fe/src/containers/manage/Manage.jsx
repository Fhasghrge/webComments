import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Self from '../../component/self/Self';
import Fe from '../../component/fe/Fe';
import Be from '../../component/be/Be';
import Alg from '../../component/alg/Alg';
import Others from '../../component/others/Others';
import Autor from '../../component/Autor/Autor';
import './Manage.scss';

export default class Manage extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const { isLogin, history } = this.props;
    console.log(isLogin);
    if (!isLogin) {
      history.push('/login');
    }
  }
  render() {
    return (
      <div id="manage">
        <Router>
          <nav>
            <Autor />
            <Link to="/self">个人中心</Link>
            <Link to="/fe">前端</Link>
            <Link to="/be">后端</Link>
            <Link to="/alg">算法</Link>
            <Link to="/others">其他</Link>
          </nav>
          <main>
            <Switch>
              <Route path="/self" component={Self}></Route>
              <Route path="/fe" component={Fe}></Route>
              <Route path="/be" component={Be}></Route>
              <Route path="/alg" component={Alg}></Route>
              <Route path="/others" component={Others}></Route>
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}
