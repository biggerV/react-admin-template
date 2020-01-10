import React from 'react';
import 'antd/dist/antd.css'
import { BrowserRouter as Router } from 'react-router-dom'
import RenderFrm from 'src/components/renderFrm'

class App extends React.Component {
  render() {
    return (
      <Router>
        <RenderFrm></RenderFrm>
      </Router>
    );
  }
}

export default App;
