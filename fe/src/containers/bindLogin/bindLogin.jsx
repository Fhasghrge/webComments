import {connect} from 'react-redux';
import Login from '../login/Login'
import {withRouter} from 'react-router-dom'

// 登录确定
const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch({type:'login'})
  }
}
const bindLogin =  connect(null, mapDispatchToProps)(Login)
export default withRouter(bindLogin)