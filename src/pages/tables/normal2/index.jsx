import React from 'react';
import styles from './index.module.scss'
import { Table, Form, Row, Col, Input, Button, Icon } from 'antd'

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

class Normal extends React.Component {

  state = {
    expand: false,
  };

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={4} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [
                {
                  required: true,
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder="placeholder" />)}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSearch} className={styles.form}>
          <Row gutter={24}>{this.getFields()}</Row>
          <Row>
            <Col span={24}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                重置
              </Button>
              <Button type="link" onClick={this.toggle} className={styles.more}>
                {this.state.expand ? '隐藏更多' : '显示更多'} <Icon type={this.state.expand ? 'up' : 'down'} />
              </Button>
            </Col>
          </Row>
        </Form>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    )
  }
}

const NormalForm = Form.create({ name: 'Normal_Form' })(Normal)

export default NormalForm
