// Import React and Component
import React, { Component } from 'react';
// Import CSS from App.css
import './App.css';
// Import the Today component to be used below
import Today from './components/Today/Today'
// Import the History component to be used below
import History from './components/History/History'

class App extends Component {
    render() {
        return (
            <div className="results--section__inner">
                <Today />
            </div>

        );
    }
}

export default App;