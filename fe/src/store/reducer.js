/* 用户信息数据
 */
const initData = {
  info: {
    url: '',
    name: 'shuang'
  },
  //测试版本
  // login: true,
  //上线版本
  login:true,
  contents: [
    '个人中心',
    '前端',
    '后端',
    '算法',
    '其他'
  ],
}

const reducer = (state = initData, action) => {
  switch (action.type) {
    case 'login':
      return Object.assign({},state,{login: true})
    default:
      return state
  }
}
export default reducer