'use strict';
import React, { Component } from 'react';
import Today from './components/Today.jsx';
import QueryEditor from './components/QueryEditor.jsx';

import Container from '@material-ui/core/Container';


class App extends Component {
    render() {
        return (
            <Container maxWidth="sm">
                <QueryEditor/>
                <Today />
            </Container>
        );
    }
}

export default App;


