import React, { Component } from 'react';

import axios from 'axios'
import Pusher from 'pusher-js'

import Button from '@material-ui/core/Button';


class Today extends Component {
    // Adds a class constructor that assigns the initial state values:
    constructor() {
        super();
        this.state = {
            cryptos: {},
            currency: 'EUR',
            query: null

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
        //this.prices = this.pusher.subscribe('coin-prices');
        const now = new Date().toISOString();
        axios.get(`https://apidatos.ree.es/es/datos/generacion/estructura-generacion?start_date=2019-01-01T00:00&end_date=${now}&time_trunc=month`)
            .then(response => this.setState({ query: response.data }))
            .catch(error => console.log(error))
    }

    componentDidMount() {
        // setInterval(() => {
        //     axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=EUR,USD')
        //         .then(response => this.sendPricePusher(response.data))
        //         .catch(error => console.log(error))
        // }, 10000)

        // // We bind to the 'prices' event and use the data in it (price information) to update the state values, thus, realtime changes
        // this.prices.bind('prices', res => {
        //     this.setState({ cryptos: res.prices });
        // }, this);
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
         const data = this.state.query ? this.state.query : [];
 
        return (
            data.length === 0 ? <h2>loading</h2> :
            <div className="today--section container">
                <h2>{data.type}</h2>
                <div className="columns today--section__box">
                    {!data.included ? [] : data.included.map(tech => {
                   
                        return (
                            <div className="column btc--section" key={tech.type}>
                                <h5>{tech.attributes.values[0].value}</h5>
                                <p>{tech.type}</p>
                            </div>)
                            
                    })}
                </div>
            </div>
        )
    }
}

export default Today;