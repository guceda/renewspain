import React, { useState, useEffect } from 'react';

import QueryEditor from './QueryEditor.jsx';
import Alert from './Alert.jsx';

import axios from 'axios';
import queryBuilder from './query/queryBuilder.js';


export default function Dashboard() {
    const [query, setQuery] = useState({});
    const [data, setData] = useState({});
    const [error, setError] = useState(false);

    const isOk = () => (
        query.category &&
        query.category !== "" &&
        query.subcategory &&
        query.subcategory !== ""
    )

    const launchQuery = () => {
        if (!isOk()) return;
        const url = queryBuilder.build(query);
        console.log('Launching query', JSON.stringify(query));
        console.log('Launching url', url);
        axios.get(url).then(onResponse).catch(onError);
    }
    const onResponse = res => { console.log(res.data); setData(res.data); setError(false) }
    const onError = error => { setError(true); setData({}); }

    useEffect(launchQuery, [query])

    return (
        <>
            <QueryEditor onSelectionChange={setQuery} onRetry={launchQuery} />
            {error ?
                <Alert
                    open={error}
                    message={'Something unexpected happened. Please try again later.'}
                    severity={'error'}
                    onClose={() => setError(false)}
                /> :
                data && data.data &&
                <h1>{data.data.type}</h1>
            }

        </>
    )
}
