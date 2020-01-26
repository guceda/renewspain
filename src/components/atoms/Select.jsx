
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import SelectBase from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: { margin: theme.spacing(1), minWidth: 120, }
}));

export default function Select({ name, value, onChange, options, description }) {
    return (
        <FormControl key={name} className={useStyles().formControl} disabled={options.length === 0}>
            <InputLabel id={`${name}-label`}>{name}</InputLabel>
            <SelectBase labelId={`${name}-label`} id={name} value={value} onChange={onChange} >
                {options && options.map(opt => <MenuItem key={opt.key} value={opt.value}>{opt.key}</MenuItem>)}
            </SelectBase>
            <FormHelperText>{description}</FormHelperText>
        </FormControl>
    )
}
