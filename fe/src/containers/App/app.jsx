import {connect} from 'react-redux';
import Manage from '../manage/Manage'
import {withRouter} from 'react-router-dom'

// 接收是否登录
const mapStateToProps = state => {
  return {
    isLogin: state.login
  }
}

// 登录确定
const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch({type:'login'})
  }
}
const Managed =  connect(mapStateToProps, mapDispatchToProps)(Manage)
export default withRouter(Managed)