/* 用户信息数据
 */
const initData = {
  name: 'shuang',
  login: false,
  contents: [
    'self',
    'fe',
    'be',
    'alg',
    'others'
  ],
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