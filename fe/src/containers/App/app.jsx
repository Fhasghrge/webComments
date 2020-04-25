import {connect} from 'react-redux';
import Manage from '../manage/Manage'
import {withRouter} from 'react-router-dom'

// 接收是否登录
const mapStateToProps = state => {
  return {
    isLogin: state.login
  }
}

const Managed =  connect(mapStateToProps)(Manage)
export default withRouter(Managed)