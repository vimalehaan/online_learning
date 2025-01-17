import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import {red} from "@mui/material/colors";

const AlertDialog = ({ open, message, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} sx={{
            "& .MuiDialog-paper" : {
                minWidth: "500px",
                borderRadius: '15px'
            }
        }}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
