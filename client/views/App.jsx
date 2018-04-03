import React from 'react';
import Routes from '../config/router.jsx'

import AppBar from './layout/app-bar'

class App extends React.Component {
    componentDidMount() {
        // do something here
    }
    render() {
        return [
          <AppBar key="1" />,
          <Routes key="2" />,
        ]
    }
}

export default App;
