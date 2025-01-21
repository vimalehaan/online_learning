import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const AlertDialog = ({ open, title, message, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={() => onClose(false)}
            sx={{
                "& .MuiDialog-paper": {
                    minWidth: "500px",
                    borderRadius: "15px",
                },
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(false)} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
