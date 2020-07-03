/* 用户信息数据
 */
const initData = {
  name: 'shuang',
  login: false,
  contents: [ // 菜单导航
    'self',
    'fe',
    'be',
    'alg',
    'others'
  ],
  /**
   * 保存打开文章详情页面时文章标识
   */
  articleId: 0 
}

const reducer = (state = initData, action) => {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state,
        {
          login: true,
          contents: action.contents,
          name: action.name
        })
    case 'DEEPARTICLE':
      return Object.assign({}, state, {
        articleId: action.articleId
      })
    default:
      return state
  }
}
export default reducer