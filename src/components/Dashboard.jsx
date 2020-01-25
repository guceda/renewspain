import React, { useState, useEffect } from 'react';

import QueryEditor from './QueryEditor.jsx';

import axios from 'axios'


export default function Dashboard() {
    const [query, setQuery] = useState({});
    const [data, setData] = useState({});

    useEffect(() => {
        console.log('Launching query', JSON.stringify(query));
        axios.get(`https://apidatos.ree.es/es/datos/generacion/estructura-generacion?start_date=2019-01-01T00:00&end_date=2020-01-01T00:00&time_trunc=month`)
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => console.log(error))
    }, [query])

    return (
        <>
            <QueryEditor onSelectionChange={setQuery}/>
            <div>{data && data.data && data.data.type}</div>
        </>
    )
}
