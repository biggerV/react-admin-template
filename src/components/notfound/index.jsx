import React from 'react'
import { Empty, Typography } from 'antd'
import notfoundIcon from 'src/static/icon-404.svg'

const { Title } = Typography

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
          <Title level={4} type="secondary">您要访问的页面不存在</Title>
        }
      ></Empty>
    )
  }
}

export default NotFound
