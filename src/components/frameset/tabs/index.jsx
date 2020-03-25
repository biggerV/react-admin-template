import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import styles from './index.module.scss'
import { Tag, Badge, Icon } from 'antd';
import eventhub from '../events.js'
import { homeRoute } from 'src/routes'

function getTabs() {
  const tabs = this.state.tabs
  const len = tabs.length
  const list = []
  for (let i = 0; i < len; i++) {
    list.push(
      <Tag
        key={i}
        closable={tabs[i].closable}
        onClose={() => { }}
        className={styles.tab}
        onClick={() => {
          this.resetTabsChecked()
          tabs[i].checked = !tabs[i].checked
          this.setState({
            tabs
          })
          this.props.history.push({
            pathname: tabs[i].path
          })
          // 通知侧栏菜单切换选中状态
          eventhub.$emit("tabs-menu-change")
        }}
      >
        <Badge dot={true} color={tabs[i].checked ? "gold" : "lightgray"} style={{ display: tabs[i].closable ? 'inherit' : 'none' }}></Badge>
        <span className={styles.title} style={{ fontWeight: tabs[i].checked ? "bold" : "normal" }}>{tabs[i].title}</span>
      </Tag>
    )
  }
  return list
}

function getRid() {
  return "b" + new Date().getTime() + "" + parseInt(Math.random() * 100)
}

class Ftabs extends React.Component {

  static propTypes = {
    show: PropTypes.bool
  }

  static defaultProps = {
    show: true
  }

  state = {
    tabs: [
      {
        id: "a1",
        title: "首页",
        path: homeRoute.path,
        checked: false,
        closable: false
      },
    ]
  }

  resetTabsChecked() {
    this.state.tabs.map(item => {
      item.checked = false
      return true
    })
  }

  componentDidMount() {
    let tabs = this.state.tabs
    eventhub.$on("sidebar-menu-selected", item => {
      let tabcur = null
      const hasno = tabs.every(tab => {
        let flag
        if (tab.path === item.path) {
          tabcur = tab
          flag = false
        } else {
          flag = true
        }
        return flag
      })
      this.resetTabsChecked()

      // 如果Tabs上不存在该菜单则添加
      if (hasno) {
        tabs = [...tabs, {
          id: getRid(),
          title: item.title,
          path: item.path,
          checked: true,
          closable: true
        }]
      } else { // 如果已经存在则高亮tab
        tabcur.checked = true
      }

      this.setState({
        tabs
      })
    })
  }

  componentWillUnmount() {
    eventhub.$destroy("sidebar-menu-selected")
  }

  render() {
    const tabs = getTabs.call(this)
    return (
      <div className={styles.tabs} style={{ display: this.props.show ? 'flex' : 'none' }}>
        <Tag className={styles.left}><Icon type="left" /></Tag>
        <div className={styles.inner}>{tabs}</div>
        <Tag className={styles.right}><Icon type="right" /></Tag>
      </div>
    )
  }

}

export default withRouter(Ftabs)
