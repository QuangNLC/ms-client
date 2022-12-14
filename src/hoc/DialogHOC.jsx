import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import styled from 'styled-components';




const DialogHOC = ({ children, title, content, onYes, okText, cancelText }) => {
    const [open, setOpen] = useState(false);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div onClick={() =>  handleClickOpen()}>
                {children}
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{cancelText ? cancelText : 'Disagree'}</Button>
                    <Button onClick={() => {
                        onYes()
                        setOpen(false)
                    }} autoFocus>
                        {okText ? okText : 'Agree'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogHOC