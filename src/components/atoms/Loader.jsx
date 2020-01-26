import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: '#b2dfdb',
    },
    barColorPrimary: {
        backgroundColor: '#00695c',
    },
})(LinearProgress);

const useStyles = makeStyles(theme => ({
    margin: { margin: theme.spacing(1) },
}));

export default function CustomizedProgressBars() {
    const classes = useStyles();
    return (
        <ColorLinearProgress className={classes.margin} />
    );
}