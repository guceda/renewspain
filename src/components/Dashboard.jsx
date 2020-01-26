import React, { useState, useEffect } from 'react';

import QueryEditor from './QueryEditor.jsx';
import Alert from './Alert.jsx';
import Loader from './Loader.jsx';

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
        setData(res.data);
        setError(null);
        setLoading(false);
    }

    const onError = e => {
        setError({ status: e.response.status, data: e.response.data });
        setData({});
        setLoading(false);
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
                        error.status === 400 ?
                            error.data.errors[0].detail :
                            'Upps, algo raro ha pasado.'
                    }
                    severity={error.status === 400 ? 'info' : 'error'}
                    onClose={() => setError(false)}
                /> :
                data && data.data &&
                <h1>{data.data.type}</h1>
            }

        </>
    )
}
