import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ReplayIcon from '@material-ui/icons/Replay';
const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function FloatingActionButtons({ icon, onClick, children, disabled }) {
    const classes = useStyles();

    return (
            <Fab variant="extended" onClick={onClick} disabled={disabled}>
                <ReplayIcon className={classes.extendedIcon} />
                {children}
            </Fab>
    );
}