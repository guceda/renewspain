import React, { useState, useEffect } from 'react';

import QueryEditor from './QueryEditor.jsx';
import Alert from './atoms/Alert.jsx';
import Loader from './atoms/Loader.jsx';
import Highcharts from './widgets/Highcharts.jsx';

import axios from 'axios';
import queryBuilder from './query/queryBuilder.js';
import utils from './utils.js';


export default function Dashboard() {
    const [query, setQuery] = useState({});
    const [visualData, setVisualData] = useState([]);
    const [meta, setMeta] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const data = [];

    const isOk = () => (
        query.category &&
        query.category !== "" &&
        query.subcategory &&
        query.subcategory !== ""
    )

    const setMetadata = (res) => {
        setMeta({
            ...meta, title: res.data.type
        });
    }

    const onResponse = (result) => {
        console.log('query', result)
        const data = buildData(result);
        const filledData = fillMissing(data);
        console.log('data', data)
        console.log('filledData', filledData)
        setVisualData(filledData);
        setMetadata(result.data.data);
        setError(null);
        setLoading(false);
    }

    const onError = e => {
        console.error(e);
        setError({ status: e.response.status, data: e.response.data });
        setVisualData({});
        setLoading(false);
    }

    const fillMissing = (series) => {
        const toMillis = utils.ISO.toMillis;
        const from = toMillis(query.from);
        const to = toMillis(query.to);
        const period = utils.period.toMillis(query.groupBy);
        const filled = series.map(s => {
            const ps = [], ts = s.data;
            if (ts.length > 0) {
                let t = from, l = ts.length, i = 0;
                while (t < to) {
                    const [ed, val] = ts[i];
                    if (i < l && (ed === t)) {
                        ps.push(ts[i]);
                        i++;
                    } else {
                        ps.push([t, null]);
                    }
                    t += period;
                }
            }
            return { ...s, data: ps };
        })
        return filled;
    }


    const buildData = ({ data, idx, maxIdx }) => {
        const series = data.data;
        const toEvent = v => [utils.ISO.toMillis(v.datetime), v.value];
        return series.included.map(s => ({
            name: s.attributes.title,
            data: s.attributes.values.map(x => toEvent(x))
        }));
    }

    const _handle = (promise) => promise
        .then(res => ([res, undefined]))
        .catch(err => ([undefined, err]))

    const launchQuery = () => {
        (async () => {
            if (!isOk()) return;
            setLoading(true);
            setError(false)
            setVisualData({});
            const urls = queryBuilder.build(query);
            console.log('urls', urls)
            debugger;
            urls.forEach((url, i) => {
                console.log('fetching url', i, url);
                axios.get(url)
                    .then(res => onResponse({ data: res, idx: i, maxIdx: urls.length - 1 }))
                    .catch(err => { onError(err); })
            })
        })();
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
                visualData && visualData.length > 0 &&
                <Highcharts
                    title={meta.title}
                    data={visualData}
                />


            }

        </>
    )
}
