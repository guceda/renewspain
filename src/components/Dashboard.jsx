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

    // const launchQuery = async() => {
    //     const responses = [];
    //     if (!isOk()) return;
    //     setLoading(true);
    //     setError(false)
    //     setData({});
    //     console.log('query values', JSON.stringify(query));
    //     const urls = queryBuilder.build(query);
    //     console.log('launching queries', urls)
    //     const promises = urls.map(url => axios.get(url).then(res => responses.push(res.data)).catch(onError));
    //     Promise.all(promises).then(res => onResponse(res, responses)).catch(()=>{});
    // }

    const onResponse = (order, results) => {
        console.log('order', order);
        console.log('query results', results);
        const hcData = buildData(order, results);
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

    const buildData = (order, results) => {
        console.log('building data')
        const d = {};
        for (let i = 1; i <= order.length; i++) {
            let idx = null;
            if (i === 1) {
                idx = order[i - 1] - 1;
                //fill common properties only once;
                d.title = results[i].data.type;
                d.series = results[idx].included.map(s => ({
                    name: s.attributes.title,
                    data: s.attributes.values.map(v => [new Date(v.datetime).getTime(), v.value])
                }));
            }

            idx = order[i] - 1;
            if (results[idx]) {
                results[idx].included.forEach((s, idx) => (
                    d.series[idx].data.push(...s.attributes.values.map(v => [new Date(v.datetime).getTime(), v.value]))
                ));
            }
        }
        console.log('data built')
        return d;
    }

    const _handle = (promise) => promise
        .then(res => ([res, undefined]))
        .catch(err => ([undefined, err]))


    useEffect(() => {
        (async () => {
            if (!isOk()) return;
            setLoading(true);
            setError(false)
            setData({});
            const urls = queryBuilder.build(query);
            for await (const [i, url] of urls.entries()) {
                const [res, err] = await _handle(axios.get(url));
                if (err) { onError(err); break; };
                onResponse({ data: res, idx: i, maxIdx: urls.length - 1 });
            }
        })();
    }, [query])

    return (
        <>
            <QueryEditor onSelectionChange={setQuery} onRetry={() => { }} />
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
