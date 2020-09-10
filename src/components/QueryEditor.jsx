import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Select from './atoms/Select.jsx';
import IconButton from './atoms/IconButton.jsx';
import DatePicker from './atoms/DatePicker.jsx';

import queryFields from './query/queryFields.js';


const useStyles = makeStyles(theme => ({ grow: { flexGrow: 1 } }));

export default function QueryEditor(props) {
    const classes = useStyles();
    const [category, setCategory] = useState('generacion');
    const [subcategory, setSubcategory] = useState('');
    const [groupBy, setGroupBy] = useState('day');

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate();
    const [from, setFrom] = useState(new Date(year, month, date).toISOString());

    const [to, setTo] = useState(new Date().toISOString());


    useEffect(() => {
        const subcategory = '';
        setSubcategory(subcategory);
        props.onSelectionChange({ category, subcategory, groupBy, from, to });
    }, [category])

    useEffect(() => {
        props.onSelectionChange({ category, subcategory, groupBy, from, to });
    }, [subcategory, groupBy, from, to])

    const handleChangeCat = e => setCategory(e.target.value);
    const handleChangeSubCat = e => setSubcategory(e.target.value);
    const handleChangeGroupBy = e => setGroupBy(e.target.value);
    const handleChangeFrom = e => setFrom(e.toISOString());
    const handleChangeTo = e => setTo(e.toISOString());

    const { name, children } = queryFields.categories;
    const opts = Object.keys(children).map(x => ({ key: children[x].name, value: x }))
    const sub = children[category] ? children[category].children : [];
    const subOpts = sub.map(x => ({ key: x, value: x }))
    const groupByOpts = queryFields.groupBy.map(x => ({ key: x, value: x }));
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
                    <Select
                        name={'group every'}
                        value={groupBy}
                        onChange={handleChangeGroupBy}
                        options={groupByOpts}
                        description={''}
                    />
                    <DatePicker value={from} onChange={handleChangeFrom} />
                    <DatePicker value={to} onChange={handleChangeTo} />
                    <IconButton onClick={props.onRetry} />
                </Toolbar>
            </AppBar>

        </div>

    )
}