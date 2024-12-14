import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";
import useUpdate from "../../hook/useUpdate";

export default function UserDeleteConfirmation({
  user_name,
  status,
  url,
  handleEdit,
}) {
  const [open, setOpen] = React.useState(true);
  const [updateUser, setUpdateUser] = useState({ status: status });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const { loading, error, confirmation, update } = useUpdate(url);

  const handleClose = () => {
    handleEdit(0);
    setOpen(false);
  };

  async function handleDelete() {
    handleEdit(0);
    update(updateUser, "");
    setOpen(false);
  }
  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0030b8",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <CircularProgress sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
            Loading ...
          </Typography>
        </Box>
      </Backdrop>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Notice"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete the user name <b>{user_name} </b>?
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button sx={{ color: "#383315" }} autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: "#383315" }} onClick={handleDelete}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
