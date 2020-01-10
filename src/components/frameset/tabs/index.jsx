import React from 'react';
import styles from './index.module.scss'
import { Tag, Badge, Icon } from 'antd';

const getTabs = function () {
  const tabs = this.state.tabs
  const len = tabs.length
  const list = []
  for (let i = 0; i < len; i++) {
    list.push(<Tag key={i} closable onClose={() => { }} className={styles.tab} onClick={() => {
      tabs[i].checked = !tabs[i].checked
      this.setState({
        tabs
      })
    }}>
      <Badge dot={true} color={tabs[i].checked ? "gold" : "lightgray"}></Badge>
      {tabs[i].title}
    </Tag>)
  }
  return list
}

class Ftabs extends React.Component {

  state = {
    tabs: [
      {
        id: "1",
        title: "标签1",
        checked: false
      }, {
        id: "2",
        title: "标签2",
        checked: false
      }
    ]
  }

  render() {
    const tabs = getTabs.call(this)
    return (
      <div className={styles.tabs}>
        <Tag className={styles.left}><Icon type="left" /></Tag>
        <div className={styles.inner}>{tabs}</div>
        <Tag className={styles.right}><Icon type="right" /></Tag>
      </div>
    )
  }

}

export default Ftabs
