import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'antd';
import axios from 'axios';
import './self.scss';
const { Option } = Select;
const { TextArea } = Input;
class Self extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      type: '',
      cnt: '',
      title: ''
    };
  }
  enterLoading = () => {
    if(this.state.cnt && this.state.type && this.state.title){
      this.setState({ loading: true });
      let formdata = new FormData();
      formdata.set('content', this.state.cnt)
      formdata.set('author', this.props.name)
      formdata.set('type', this.state.type)
      formdata.set('title', this.state.title)
      axios({
        method:'post',
        url:'/addArticles',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(res => {
          if(res.data.errcode === 0) {
            this.setState({
              type: '',
              cnt: '',
              title: ''
            })
            alert('提交成功！')
          }else {
            alert('提交失败')
          }
        })
    }else {
      alert('请不要提交空的')
    }
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  };
  handleInputText = (e) => {
    this.setState({
      cnt: e.target.value,
    });
  };
  handleChange = (value) => {
    this.setState({
      type: value,
    });
  };
  inputTitle = e => {
    this.setState({
      title: e.target.value
    })
  }
  render() {
    return (
      <div className="self">
        <input type="text" name="title" id="title" placeholder='TITLE' onChange={this.inputTitle}/>
        <TextArea onChange={this.handleInputText} placeholder='CONTENT' rows={10}></TextArea>
        <div id="write-up">
          <Select
            style={{ width: '30%' }}
            placeholder="select one type"
            onChange={this.handleChange}
            optionLabelProp="label"
          >
            <Option value="fe" label="FE">
              <div className="demo-option-label-item">
                <span role="img" aria-label="fe">
                  FE
                </span>
              </div>
            </Option>
            <Option value="be" label="BE">
              <div className="demo-option-label-item">
                <span role="img" aria-label="be">
                  BE
                </span>
              </div>
            </Option>
            <Option value="alg" ALG label="ALG">
              <div className="demo-option-label-item">
                <span role="img" aria-label="alg">
                  ALG
                </span>
              </div>
            </Option>
            <Option value="others" label="OTHERS">
              <div className="demo-option-label-item">
                <span role="img" aria-label="others">
                  OTHERS
                </span>
              </div>
            </Option>
          </Select>
        </div>
        <Button
          type="primary"
          loading={this.state.loading}
          onClick={this.enterLoading}
          className="add-btn"
        >
          发表
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.name,
});
// const mapDispatchToProps = dispatch => {
//   return {
//     login: (cont, name) => dispatch(actionLogin(cont, name))
//   }
// }
export default connect(mapStateToProps)(Self);
