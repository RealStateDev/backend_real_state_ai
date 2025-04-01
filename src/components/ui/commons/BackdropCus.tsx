import React, {useState} from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface backDropProps
{
    color: string;
    open: boolean;
}


export default function BackdropCus(props:backDropProps){
    return (
            <Backdrop
            sx={(theme) => ({ color: `${props.color}`, zIndex: theme.zIndex.drawer + 1 })}
            open={props.open}
            >
            <CircularProgress color="inherit" />
            </Backdrop>
    )
}