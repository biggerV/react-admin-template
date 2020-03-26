import React from 'react';
import { Row, Col, Card, Icon, Tooltip, Divider, List, Avatar } from 'antd'
import styles from './index.module.scss'

const data = [
  {
    title: '讨论 Title 1',
  },
  {
    title: '讨论 Title 2',
  },
  {
    title: '讨论 Title 3',
  },
  {
    title: '讨论 Title 4',
  },
];

class Home extends React.Component {

  render() {
    return (
      <div>
        <Row gutter={20}>
          <Col span={6}>
            <Card size="small" title="用户统计" className={styles.card} extra={<Tooltip placement="top" title="message"><Icon type="info-circle"></Icon></Tooltip>}>
              <div className={styles.content}>
                <div className={styles.title}>总数 122333</div>
                <div>昨日增加 111</div>
                <div>今日增加 81</div>
              </div>
              <Divider style={{ margin: '10px 0' }} />
              <div>日均增加 45</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="用户统计" className={styles.card} extra={<Tooltip placement="top" title="message"><Icon type="info-circle"></Icon></Tooltip>}>
              <div className={styles.content}>
                <div className={styles.title}>总数 122333</div>
                <div>昨日增加 111</div>
                <div>今日增加 81</div>
              </div>
              <Divider style={{ margin: '10px 0' }} />
              <div>日均增加 45</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="用户统计" className={styles.card} extra={<Tooltip placement="top" title="message"><Icon type="info-circle"></Icon></Tooltip>}>
              <div className={styles.content}>
                <div className={styles.title}>总数 122333</div>
                <div>昨日增加 111</div>
                <div>今日增加 81</div>
              </div>
              <Divider style={{ margin: '10px 0' }} />
              <div>日均增加 45</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="用户统计" className={styles.card} extra={<Tooltip placement="top" title="message"><Icon type="info-circle"></Icon></Tooltip>}>
              <div className={styles.content}>
                <div className={styles.title}>总数 122333</div>
                <div>昨日增加 111</div>
                <div>今日增加 81</div>
              </div>
              <Divider style={{ margin: '10px 0' }} />
              <div>日均增加 45</div>
            </Card>
          </Col>
        </Row>

        <Card size="small" title="内部讨论"
          style={{ marginTop: '20px' }}
          extra={<Tooltip placement="top" title="message"><Icon type="info-circle"></Icon></Tooltip>}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 3,
            }}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面"
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    )
  }
}

export default Home
