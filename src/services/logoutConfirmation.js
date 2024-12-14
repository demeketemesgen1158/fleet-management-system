import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";
import usePost from "../hook/usePost";

export default function LogoutConfirmation({ itemName }) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const url = "https://fleet-demo.maflink.com/api/api/users/logout";
  const { loading, error, confirmation, post } = usePost(url);

  function handleLogout() {
    post({}, sessionStorage.getItem("token"));
    sessionStorage.clear();
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ "& .MuiDialog-paper": { width: "min(400px, 100%)" } }}
      >
        <DialogTitle id="responsive-dialog-title">{"Notice"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            sx={{ textTransform: "none", color: "#383315" }}
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            sx={{ textTransform: "none", color: "#383315" }}
            onClick={handleLogout}
            href="/"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
