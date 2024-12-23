import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useWriteContract } from "wagmi";
import { RECURRING_EXECUTOR_CONTRACT_ADDRESS } from "../../../utils/constants";
import { parseAbi } from "viem";

export interface PauseConfirmDialogProps {
  open: boolean;
  onClose: () => void;
}

const PauseConfirmDialog: React.FC<PauseConfirmDialogProps> = ({
  open,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleClose = () => {
    onClose();
    setInputValue("");
    setIsConfirmed(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsConfirmed(value.toLowerCase() === "confirm");
  };

  const handleConfirm = () => {
    writeContract({
      address: RECURRING_EXECUTOR_CONTRACT_ADDRESS,
      functionName: "pause",
      abi: parseAbi(["function pause() external"]),
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Pause Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To confirm pausing this action, please type{" "}
            <strong>"confirm"</strong> in the input field below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Type 'confirm'"
            type="text"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
            helperText={
              isConfirmed ? "" : 'Type "confirm" to enable the Confirm button.'
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            disabled={!isConfirmed}
            startIcon={
              isPending && <CircularProgress size={20} color="inherit" />
            }
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PauseConfirmDialog;
