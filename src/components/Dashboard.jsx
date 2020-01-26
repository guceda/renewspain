import React, { useState, useEffect } from 'react';

import QueryEditor from './QueryEditor.jsx';
import Alert from './atoms/Alert.jsx';
import Loader from './atoms/Loader.jsx';
import Highcharts from './widgets/Highcharts.jsx';

import axios from 'axios';
import queryBuilder from './query/queryBuilder.js';


export default function Dashboard() {
    const [query, setQuery] = useState({});
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const isOk = () => (
        query.category &&
        query.category !== "" &&
        query.subcategory &&
        query.subcategory !== ""
    )

    const launchQuery = () => {
        if (!isOk()) return;
        setLoading(true);
        setError(false)
        setData({});
        const url = queryBuilder.build(query);
        console.log('Launching query', JSON.stringify(query));
        console.log('Launching url', url);
        axios.get(url).then(onResponse).catch(onError);
    }

    const onResponse = res => {
        console.log(res.data);
        const hcData = buildData(res.data);
        console.log(hcData)
        setData(hcData);
        setError(null);
        setLoading(false);
    }

    const onError = e => {
        setError({ status: e.response.status, data: e.response.data });
        setData({});
        setLoading(false);
    }

    const buildData = (data) => {
        const d = {};
        d.series = data.included.map(s => ({
            name: s.attributes.title,
            data: s.attributes.values.map(v => [new Date(v.datetime).getTime(), v.value])
        }));
        d.title = data.data.type;

        return d;
    }

    useEffect(launchQuery, [query])

    return (
        <>
            <QueryEditor onSelectionChange={setQuery} onRetry={launchQuery} />
            {loading && <Loader />}
            {error ?
                <Alert
                    open={!!error}
                    message={
                        error.status === 500 ?
                            'Upps, algo raro ha pasado.' :
                            error.data.errors[0].detail
                    }
                    severity={error.status === 500 ? 'error' : 'warning'}
                    onClose={() => setError(false)}
                /> :
                data && data.series && data.series.length > 0 &&
                <Highcharts
                    title={data.title}
                    data={data.series}
                />


            }

        </>
    )
}
