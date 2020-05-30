function login(contents, name) {
  return {
    type:'LOGIN',
    contents,
    name
  }
}
function deepArticle(articleId) {
  return {
    type: 'DEEPARTICLE',
    articleId
  }
}
export {
  deepArticle,
  login
}