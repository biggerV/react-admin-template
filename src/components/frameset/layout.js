import React from 'react';
import { Layout } from 'antd';
import { WIN } from 'src/utils/util.js'
import { Fheader, Fsidebar, Fcontent, Ftabs } from 'src/components/frameset'

class Flayout extends React.Component {

  render() {
    return (
      <Layout style={{ height: WIN.height + 'px' }}>
        <Fsidebar></Fsidebar>
        <Layout>
          <Fheader></Fheader>
          <Ftabs></Ftabs>
          <Fcontent></Fcontent>
        </Layout>
      </Layout >
    );
  }
}

export default Flayout;
