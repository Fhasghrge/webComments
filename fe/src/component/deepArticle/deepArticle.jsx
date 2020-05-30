import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './deep.scss'
class deepArticle extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      author: '',
      content: '',
      type: '',
      title: '',
    };
  }
  componentDidMount() {
    let query = this.props.location.search.slice(4);
    this.setState({
      id: query
    })
    let formdata = new FormData();
    formdata.set('id', query);
    axios({
      method: 'POST',
      url: '/getDeepArticle',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => {
      const { content, author, type, title } = res.data[0];
      this.setState({
        content,
        author,
        type,
        title,
      });
    });
  }
  render() {
    return (
      <div className="detail">
        <h2>{this.state.title}</h2>
        <span>{this.state.author}</span>
        <span>{this.state.type}</span>
        <p>{this.state.content}</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.name,
  articleId: state.articleId,
});
export default connect(mapStateToProps)(deepArticle);
