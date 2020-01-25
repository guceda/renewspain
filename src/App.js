'use strict';
import React, { Component } from 'react';
import Dashboard from './components/Dashboard.jsx';

import Container from '@material-ui/core/Container';


class App extends Component {
    render() {
        return (
            <Container maxWidth="sm">
                <Dashboard/>
            </Container>
        );
    }
}

export default App;


