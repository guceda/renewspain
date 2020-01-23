import React, { Component } from 'react';
import './today.css'

import axios from 'axios'
import Pusher from 'pusher-js'

class Today extends Component {
    // Adds a class constructor that assigns the initial state values:
    constructor() {
        super();
        this.state = {
            cryptos: {},
            currency: 'EUR'
        };
    }
    
    // This is called when an instance of a component is being created and inserted into the DOM.
    componentWillMount() {
        // establish a connection to Pusher
        this.pusher = new Pusher('7115a2da7069d51ec7ee', {
            cluster: 'eu',
            forceTLS: true
        });
        // Subscribe to the 'coin-prices' channel
        this.prices = this.pusher.subscribe('coin-prices');

        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=EUR,USD')
            .then(response => this.setState({ cryptos: response.data }))
            .catch(error => console.log(error))
    }

    componentDidMount() {
        setInterval(() => {
            axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=EUR,USD')
                .then(response => this.sendPricePusher(response.data))
                .catch(error => console.log(error))
        }, 10000)

        // We bind to the 'prices' event and use the data in it (price information) to update the state values, thus, realtime changes
        this.prices.bind('prices', res => {
            this.setState({ cryptos: res.prices });
        }, this);
    }

    sendPricePusher(data) {
        axios.post('/prices/new', {
            prices: data
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    // The render method contains the JSX code which will be compiled to HTML.
    render() {
        const { cryptos, currency } = this.state;
        const options = Object.keys(cryptos || {});
        return (
            <div className="today--section container">
                <h2>Current Price</h2>
                <div className="columns today--section__box">
                    {options.map(coin => {
                        return (
                            <div className="column btc--section" key={coin}>
                                <h5>{cryptos[coin] ? `${cryptos[coin][currency]} €` : 'no data available'}</h5>
                                <p>1 {coin}</p>
                            </div>)
                    })}
                </div>
            </div>
        )
    }
}

export default Today;