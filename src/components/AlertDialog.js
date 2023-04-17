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
                        <h3>
                            Gebucht am: {specialViewCreated} Uhr
                        </h3>
                        <h3>
                            Für das Datum: {specialViewDate}
                        </h3>
                        <h3>
                            Sitzplatz-Nr: {specialViewWorkplaceId}
                        </h3>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {specialViewDelete === true && (
                        <>
                            <Button onClick={deleteWorkplace}>Buchung Löschen</Button>
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