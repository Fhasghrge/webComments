import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Input } from 'antd';

import Zan from '../../assets/image/zan.png';
// import ZanActive from '../../assets/image/zan_active.png'
import Cai from '../../assets/image/cai.png';
// import CaiActive from '../../assets/image/cai_active.png'
import CommentLogo from '../../assets/image/comment.png';
import './deep.scss';
const { TextArea } = Input;
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
      commentValue: '',
      showComInput: false,
      comments: [],
    };
  }
  componentDidMount() {
    let query = this.props.location.search.slice(4);
    this.setState({
      id: query,
    });
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
  showInput = () => {
    this.setState(preProps => ({
      showComInput: !preProps.showComInput
    }))
  }
  onChange = ({ target: { value } }) => {
    this.setState({ commentValue: value });
  };
  postComment = () => {
    let formdata = new FormData();
    formdata.set('author', this.props.name);
    formdata.set('content', this.state.commentValue);
    formdata.set('article', this.state.id);
    axios({
      method: 'POST',
      url: '/postComment',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(res => {
        if(res.data.errcode === 0) {
          this.setState({
            commentValue: ''
          })
          this.showComments()
        }else {
          alert('评论失败')
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  showComments = () => {
    let formdata = new FormData();
    formdata.set('article', this.state.id);
    axios({
      method: 'POST',
      url: '/getComments',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(res => {
        this.setState({
          comments: res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
  deleteComment(id) {
    let formdata = new FormData();
    formdata.set('id', id);
    axios({
      method: 'POST',
      url: '/deleteComments',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(res => {
        if(res.data.errcode === 0) {
          this.showComments()
        }else {
          alert('删除失败')
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div className="detail">
        <div className="main">
          <h2>{this.state.title}</h2>
          <span>{this.state.author}</span>
          <span>{this.state.type}</span>
          <p>{this.state.content}</p>
          <div className="actions">
            <div onClick={this.showInput} className="comment">
              <img src={CommentLogo} alt="comment" />
            </div>
            <div className="showComments">
              <button onClick={this.showComments}>showComments</button>
            </div>
          </div>
        </div>
        <div className={`commentInput ${this.state.showComInput? '':'hide'}` }>
          <TextArea
            value={this.state.commentValue}
            onChange={this.onChange}
            placeholder="At most 200 letters"
            maxLength={200}
            autoSize={{ minRows: 1, maxRows: 5 }}
          />
          <div className="btns">
            <button onClick={this.postComment}>发表</button>
          </div>
        </div>
        <div className="comments">
          <ul>
            {this.state.comments.map((item) => (
              <li key={item.id}>
                <header>
                  <div className="name">{this.props.name === item.author? 'YouSelf': item.author}</div>
                  <div className={`btns ${this.props.name === item.author? '': 'hide'}`}>
                    <button onClick={this.deleteComment.bind(this, item.id)}>Delete</button>
                    <button>Change</button>
                  </div>
                </header>
                <main>{item.content}</main>
                <footer>
                  <div className="actions">
                    <img src={Zan} alt="zan" />
                    <img src={Cai} alt="cai" />
                    <img src={CommentLogo} alt="comment" />
                  </div>
                  <div className="date">{item.data}</div>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.name,
  articleId: state.articleId,
});
export default connect(mapStateToProps)(deepArticle);
