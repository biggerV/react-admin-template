import React from 'react';
import styles from './index.module.scss'
import { Layout, Avatar, Menu, Dropdown, Icon, Row, Col, Badge, Tooltip } from 'antd';
import { CLS, authToken } from 'src/utils/util.js'
import eventhub from '../events.js'
import { withRouter } from 'react-router'

const { Header } = Layout;

const userMenus = () => {
  return (
    <Menu>
      <Menu.Item>
        <a href="javascirpt:;">
          个人中心
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="javascirpt:;">
          个人设置
        </a>
      </Menu.Item>
    </Menu>
  )
}

const localesMenus = () => {
  return (
    <Menu>
      <Menu.Item>
        <a href="javascirpt:;">
          中文
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="javascirpt:;">
          English
        </a>
      </Menu.Item>
    </Menu>
  )
}

class Fheader extends React.Component {

  state = {
    collapsed: false,
  };

  toggle = () => {
    const collapsed = !this.state.collapsed
    this.setState({
      collapsed
    });
    eventhub.$emit("collapsed", collapsed)
  };

  logout = () => {
    authToken.remove()
    this.props.history.push("/login")
  }

  render() {
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Row>
          <Col span={6}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Col>
          <Col span={18}>
            <div className={styles.menu}>
              <Dropdown overlay={userMenus}>
                <div className={CLS([styles.item, styles.link])}>
                  <Avatar icon="user" className={styles.avatar} />
                  <span>
                    Victor <Icon type="down" />
                  </span>
                </div>
              </Dropdown>
              <div className={CLS([styles.item, styles.link])}>
                <Tooltip placement="bottom" title="常见问题">
                  <Icon type="question-circle" className={styles.icon} />
                </Tooltip>
              </div>
              <div className={CLS([styles.item, styles.link])}>
                <Badge count={99} offset={[2, -5]}>
                  <Icon type="bell" className={styles.icon} />
                </Badge>
              </div>
              <Dropdown overlay={localesMenus}>
                <div className={CLS([styles.item, styles.link])}>
                  <Icon type="global" className={styles.icon} />
                </div>
              </Dropdown>
              <div className={CLS([styles.item, styles.link])} onClick={this.logout}>
                <Tooltip placement="left" title="退出系统">
                  <Icon type="poweroff" className={styles.icon} />
                </Tooltip>
              </div>
            </div>
          </Col>
        </Row>
      </Header >
    )
  }
}

export default withRouter(Fheader)
