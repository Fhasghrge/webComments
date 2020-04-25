import React from 'react';
import { Input, Upload, Button, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './self.css';
const { Option } = Select;
export default class Self extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  enterLoading = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 8000);
  };
  handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  render() {
    let props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      previewFile(file) {
        console.log('Your upload file:', file);
        // Your process logic. Here we just mock to the same file
        return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
          method: 'POST',
          body: file,
        })
          .then((res) => res.json())
          .then(({ thumbnail }) => thumbnail);
      },
    };
    return (
      <div className="self">
        <Input
          className="write-title"
          size="large"
          placeholder="请输入文章标题"
          name="title"
        ></Input>
        <div id="write-up">
          <Select
            mode="multiple"
            style={{ width: '30%' }}
            placeholder="select one country"
            defaultValue={['前端']}
            onChange={this.handleChange}
            optionLabelProp="label"
          >
            <Option value="前端" label="前端">
              <div className="demo-option-label-item">
                <span role="img" aria-label="前端">
                  FE
                </span>
                前端
              </div>
            </Option>
            <Option value="后端" label="后端">
              <div className="demo-option-label-item">
                <span role="img" aria-label="后端">
                  BE
                </span>
                后端
              </div>
            </Option>
            <Option value="算法" label="算法">
              <div className="demo-option-label-item">
                <span role="img" aria-label="算法">
                  ALG
                </span>
                算法
              </div>
            </Option>
            <Option value="其他" label="其他">
              <div className="demo-option-label-item">
                <span role="img" aria-label="其他">
                  OTH
                </span>
                其他
              </div>
            </Option>
          </Select>
          <Upload {...props}>
            <Button>
              <UploadOutlined /> Upload  (Must be .md file)
            </Button>
          </Upload>
        </div>
        <Button
          type="primary"
          loading={this.state.loading}
          onClick={this.enterLoading}
          className="add-btn"
        >
          上传
        </Button>
      </div>
    );
  }
}
