import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Select from './Select.jsx';
import Button from './Button.jsx';

import queryFields from './query/queryFields.js';


const useStyles = makeStyles(theme => ({ grow: { flexGrow: 1 } }));

export default function QueryEditor(props) {
    const classes = useStyles();
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');


    useEffect(() => {
        setSubcategory("");
        props.onSelectionChange({ category, subcategory: '' });
    }, [category])

    useEffect(() => {
        props.onSelectionChange({ category, subcategory });
    }, [subcategory])

    const handleChangeCat = e => { setCategory(e.target.value); };
    const handleChangeSubCat = e => { setSubcategory(e.target.value); };

    const { name, children } = queryFields.children;
    const opts = Object.keys(children).map(x => ({ key: children[x].name, value: x }))
    const sub = children[category] ? children[category].children : [];
    const subOpts = sub.map(x => ({ key: x, value: x }))
    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
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
                    <Button onClick={props.onRetry}/>
                </Toolbar>
            </AppBar>
       
        </div>

    )
}