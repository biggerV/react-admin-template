import React from 'react'
import { Empty } from 'antd'
import notfoundIcon from 'src/static/icon-404.svg'

class NotFound extends React.Component {

  render() {
    return (
      <Empty
        {...this.props}
        image={notfoundIcon}
        imageStyle={{
          height: 150
        }}
        description={
          <span style={{ fontSize: '18px' }}>您要访问的页面不存在</span>
        }
      ></Empty>
    )
  }
}

export default NotFound
