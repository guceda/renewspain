
import React, { useState, useEffect } from 'react';
import Select from './Select.jsx'
import Button from './Button.jsx'

import queryFields from './query/queryFields.js';

export default function QueryEditor(props) {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');

    useEffect(()=> {
        setSubcategory("");
        props.onSelectionChange({category, subcategory: ''});
    }, [category])

    useEffect(()=> {
        props.onSelectionChange({category, subcategory});
    }, [ subcategory])

    const handleChangeCat = e => { setCategory(e.target.value); };
    const handleChangeSubCat = e => { setSubcategory(e.target.value); };

    const { name, children } = queryFields.children;
    const opts = Object.keys(children).map(x =>({key:children[x].name, value: x}))
    const sub = children[category] ? children[category].children : [];
    const subOpts = sub.map(x =>({key:x, value: x}))
    return (
        <>
            <Select
                name={name}
                value={category}
                onChange={handleChangeCat}
                options={opts}
                description={''}
            />
            <Select
                name={category}
                value={subcategory}
                onChange={handleChangeSubCat}
                options={subOpts}
                description={''}
            />
            <Button onClick={()=>console.log('click')}>Retry</Button>
        </>
    )
}
