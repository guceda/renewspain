import React, { useState, useEffect } from 'react';

import QueryEditor from './QueryEditor.jsx';

import axios from 'axios';
import queryBuilder from './query/queryBuilder.js';


export default function Dashboard() {
    const [query, setQuery] = useState({});
    const [data, setData] = useState({});

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
    const onResponse = (res) => { console.log(res.data); setData(res.data) }
    const onError = error => console.log(error)

    useEffect(launchQuery, [query])

    return (
        <>
            <QueryEditor onSelectionChange={setQuery} />
            <div>{data && data.data && data.data.type}</div> :
        </>
    )
}
