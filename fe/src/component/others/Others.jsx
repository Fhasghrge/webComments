import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deepArticle } from '../../store/action';
import '../../assets/style/articles.scss';
class others extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }
  componentDidMount() {
    let formdata = new FormData();
    formdata.set('author', this.props.name);
    formdata.set('type', 'others');
    axios({
      method: 'POST',
      url: '/getArticles',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => {
      this.setState({
        articles: res.data,
      });
    });
  }
  render() {
    return (
      <div className="others">
        <ul>
          {this.state.articles.map((item, index) => (
            <Link key={item.id} to={'/detail?id=' + item.id}>
              <p>标题：{item.title}</p>
              <span>作者：{item.author}</span>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.name,
});
const mapDispatchToProps = (dispatch) => {
  return {
    detailArticle: (articleId) => dispatch(deepArticle(articleId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(others);
