import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Self from '../../component/self/Self';
import Fe from '../../component/fe/Fe';
import Be from '../../component/be/Be';
import Alg from '../../component/alg/Alg';
import Others from '../../component/others/Others';
import deepArticle from '../../component/deepArticle/deepArticle';
import './Manage.scss';

class Manage extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { isLogin, history } = this.props;
    if (!isLogin) {
      history.push('/login');
    }
  }
  render() {
    return (
      <div id="manage">
        <Router>
          <nav>
            <p>{this.props.name}</p>
            <ul>
              {this.props.contents.map((item) => (
                <Link key={item} to={'/' + item}>{item.toUpperCase()}</Link>
              ))}
            </ul>
          </nav>
          <main>
            <Switch>
              <Route path="/self" component={Self}></Route>
              <Route path="/fe" component={Fe}></Route>
              <Route path="/be" component={Be}></Route>
              <Route path="/alg" component={Alg}></Route>
              <Route path="/others" component={Others}></Route>
              <Route path="/detail" component={deepArticle}></Route>
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isLogin: state.login,
  contents: state.contents,
  name: state.name,
});
export default connect(mapStateToProps)(Manage);
