import React, { useState, useRef, useEffect, forwardRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import usePost from "../../hook/usePost";
import { useForm, Controller } from "react-hook-form";
import Notification from "../../services/notification";

// List of roles and permissions
const roles = ["Manager", "Driver"];

const permissionsList = [
  { label: "Update row", value: "update_row" },
  { label: "Delete row", value: "delete_row" },
  { label: "Create new user", value: "create_new_user" },
  { label: "Delete user", value: "delete_user" },
  { label: "Update user", value: "update_user" },
];

// Transition for dialog
const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const PermissionsDialog = ({
  open,
  onClose,
  permissions,
  onPermissionChange,
}) => {
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle
        id="scroll-dialog-title"
        sx={{
          display: "flex",
          flexDirection: "row",
          borderBottom: "2px solid #1d3f6b",
          gap: 2,
        }}
      >
        <ManageAccountsIcon />
        <Typography>User Permissions</Typography>
      </DialogTitle>
      <DialogContent>
        {permissionsList.map((permission) => (
          <FormGroup key={permission.value}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={permissions[permission.value] || false}
                  onChange={(e) =>
                    onPermissionChange(permission.value, e.target.checked)
                  }
                  sx={{
                    "&.Mui-checked": {
                      color: "#1d3f6b",
                    },
                  }}
                />
              }
              label={permission.label} // Re-added label here
            />
          </FormGroup>
        ))}
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "#1d3f6b",
        }}
      >
        <Button sx={{ color: "white" }} onClick={() => onClose(false)}>
          Cancel
        </Button>
        <Button sx={{ color: "white" }} onClick={() => onClose(true)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddUser = () => {
  const [permissions, setPermissions] = useState({});
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const [user, setUser] = useState({});
  const token = sessionStorage.getItem("token");
  const url = "https://fleet-demo.maflink.com/api/api/users/register";
  const { loading, error, confirmation, post } = usePost(url);

  useEffect(() => {
    // Initialize permissions with default values (unchecked)
    const initialPermissions = permissionsList.reduce((acc, permission) => {
      acc[permission.value] = false;
      return acc;
    }, {});
    setPermissions(initialPermissions);
  }, []);

  const handlePermissionChange = (permissionValue, isChecked) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permissionValue]: isChecked,
    }));
  };

  const onSubmit = (data) => {
    // Include all permissions (checked or unchecked) in the submitted data
    const updatedUser = { ...data, permissions };
    post(updatedUser, token);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setUser({ ...user, [field]: value });
    setValue(field, value);
  };

  const handlePermission = () => setOpen(true);

  console.log(sessionStorage.getItem("company_id"));

  return (
    <>
      <PermissionsDialog
        open={open}
        onClose={(save) => {
          if (save) {
            // Handle save action if needed
          }
          setOpen(false);
        }}
        permissions={permissions}
        onPermissionChange={handlePermissionChange}
      />
      <Box sx={{ maxWidth: 800 }}>
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Stack
            sx={{
              width: "100%",
              backgroundColor: "whitesmoke",
              borderBottom: "2px solid #1d3f6b",
              display: "flex",
              alignContent: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 3,
              padding: 3,
            }}
          >
            <PersonAddOutlinedIcon />
            <Typography color="inherit" variant="h6">
              New User
            </Typography>
          </Stack>
          <FormGroup
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              padding: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexFlow: "row wrap",
                gap: 3,
                "& .MuiTextField-root": { m: 1, width: "21ch" },
              }}
            >
              {[
                { name: "full_name", label: "Full Name" },
                { name: "role", label: "Role", type: "select", options: roles },
                { name: "user_name", label: "User Name" },
                { name: "password", label: "Password", type: "password" },
                {
                  name: "password_confirmation",
                  label: "Confirm password",
                  type: "password",
                },
              ].map(
                ({ name, label, type = "text", options = [] }) =>
                  name && (
                    <Controller
                      key={name}
                      name={name}
                      control={control}
                      defaultValue=""
                      rules={{ required: `${label} is required` }}
                      render={({ field }) => (
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, width: "21ch" }}
                        >
                          <InputLabel>
                            {label} <span style={{ color: "#e50140" }}>*</span>
                          </InputLabel>
                          {type === "select" ? (
                            <Select
                              {...field}
                              onChange={handleChange(name)}
                              error={Boolean(errors[name])}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {options.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            <Input
                              {...field}
                              type={type}
                              onChange={handleChange(name)}
                              error={Boolean(errors[name])}
                            />
                          )}
                          {errors[name] && (
                            <Typography
                              color="error"
                              variant="body2"
                              sx={{ mt: 1 }}
                            >
                              {errors[name].message}
                            </Typography>
                          )}
                        </FormControl>
                      )}
                    />
                  )
              )}
              <Button
                onClick={handlePermission}
                sx={{
                  textTransform: "none",
                  color: "#383315",
                  border: "1px solid #0030b8",
                }}
              >
                User Permissions
              </Button>
            </Box>
            <Box sx={{ width: "100%", borderRadius: 1 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit(onSubmit)}
                sx={{
                  backgroundColor: "#1d3f6b",
                  mt: 2,
                  "&:hover": { backgroundColor: "#124c97" },
                }}
              >
                Submit
              </Button>
              {confirmation && <Notification message={confirmation.message} />}
              {error && <Notification message={error} color="#e50140" />}
            </Box>
          </FormGroup>
        </Paper>
      </Box>
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
            backgroundColor: "#1d3f6b",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <CircularProgress sx={{ color: "white" }} />
          <Typography variant="h6" sx={{ mt: 2, color: "white" }}>
            Submiting ...
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
};

export default AddUser;
