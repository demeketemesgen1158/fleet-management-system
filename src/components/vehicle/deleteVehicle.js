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
import Divider from "@mui/material/Divider";
import useUpdate from "../../hook/useUpdate";

export default function DeleteVehicle({
  name,
  material_id,
  availability,
  quantity,
  url,
}) {
  const [open, setOpen] = useState(true);

  const token = sessionStorage.getItem("token");

  const [material, setMaterial] = useState({
    material_name: name,
    material_id,
    availability: availability,
    quantity: quantity,
  });

  const { loading, update } = useUpdate(url);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    update(material, token);
    setOpen(false);
  };

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
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading ...
          </Typography>
        </Box>
      </Backdrop>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ "& .MuiDialog-paper": { width: "min(400px, 100%)" } }}
      >
        <DialogTitle id="responsive-dialog-title">{"Notice"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to{" "}
            <b>{availability != "delete" ? "restore" : "delete"} </b> {name}?
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
