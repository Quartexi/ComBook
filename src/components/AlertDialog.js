import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AlertDialog({specialViewCreated, specialViewDate, specialViewWorkplaceId, specialViewUsername, specialViewDelete, deleteWorkplace, open, onClose}) {

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Sitzplatz Reserviert von: " + specialViewUsername}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <h2>
                            Gebucht am: {specialViewCreated}
                        </h2>
                        <h2>
                            Datum: {specialViewDate}
                        </h2>
                        <h2>
                            Sitzplatz: {specialViewWorkplaceId}
                        </h2>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {specialViewDelete === true && (
                        <>
                            <Button onClick={deleteWorkplace}>Delete</Button>
                        </>
                    )}
                    <Button onClick={onClose}>
                        Schließen
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default AlertDialog;