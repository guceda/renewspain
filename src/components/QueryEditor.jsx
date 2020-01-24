
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import queryFields from '../queryFields.js';
import DatePicker from './DatePicker.jsx';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function QueryEditor() {
    const classes = useStyles();
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');

    const handleChangeCat = e => { setCategory(e.target.value); };
    const handleChangeSubCat = e => { setSubcategory(e.target.value); };

    const f = queryFields.children;
    const renderModel = (_model) => {
        const { name, children } = _model;
        const opts = Object.keys(children);
        const subOpts = children[category] ? children[category].children : [];
        return (
            <>
                <FormControl key={'category'} className={classes.formControl}>
                    <InputLabel id={`${name}-label`}>{name}</InputLabel>
                    <Select labelId={`${name}-label`} id={name} value={category} onChange={handleChangeCat} >
                        {opts.map(opt => {
                            const name = children[opt].name
                            return <MenuItem key={name} value={opt}>{name}</MenuItem>
                        }
                        )}
                    </Select>
                    <FormHelperText></FormHelperText>
                </FormControl>
                <FormControl key={'subCategory'} className={classes.formControl}>
                    <InputLabel id={`${category}-label`}>{category}</InputLabel>
                    <Select labelId={`${category}-label`} id={category} value={subcategory} onChange={handleChangeSubCat} >
                        {subOpts.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                    </Select>
                    <FormHelperText></FormHelperText>
                </FormControl>
            </>
        )


    }

    return (
        <div>
            {renderModel(queryFields.children)}
        </div>
    );
}
