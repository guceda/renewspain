import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';


export default function Icon({ icon, onClick, disabled }) {
    return (
        <IconButton onClick={onClick} disabled={disabled}>
            <ReplayIcon/>
        </IconButton>
    );
}