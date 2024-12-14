import React, { useState, useEffect } from "react";
import { FormGroup, Checkbox } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { format, toZonedTime } from "date-fns-tz";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";

import AppsIcon from "@mui/icons-material/Apps";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import useFetch from "../../hook/useFetch";
import useUpdate from "../../hook/useUpdate";
import UserDeleteConfirmation from "./userDeleteConfirmation";

const headCells = [
  "No.",
  "Name",
  "User Name",
  "Company Id",
  "Password",
  "User Role",
  "Status",
  "Last Login",
  "Permissions",
  "Action",
];

const EnhancedTableToolbar = () => (
  <Stack
    sx={{
      width: "100%",
      display: "flex",
      alignContent: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      borderBottom: "2px solid #1d3f6b",
      position: "sticky",
      left: 0,
      p: 2,
    }}
  >
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
      }}
    >
      <AppsIcon />
      <Typography color="inherit" variant="h6">
        All Users
      </Typography>
    </Stack>
    <Button
      disabled={
        !JSON.parse(sessionStorage.getItem("permissions")).create_new_user
      }
      variant="contained"
      href="/add-user"
      sx={{
        width: 130,
        backgroundColor: "#1d3f6b",
        textTransform: "none",
        color: "white",
        borderRadius: 1,
        whiteSpace: "nowrap",
      }}
    >
      <PersonAddIcon />
      <Typography sx={{ ml: 1 }}>Add User</Typography>
    </Button>
  </Stack>
);

const PermissionsDialog = ({
  handlePermissionChange,
  users,
  open,
  onClose,
}) => {
  const [permissions, setPermissions] = useState(users.permissions);

  const handlePermissionValue = (field, permitValue) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [field]: permitValue,
    }));
  };

  // console.log(permissions);
  return (
    <Dialog
      open={open}
      scroll="paper"
      aria-labelledby="permissions-dialog-title"
      aria-describedby="permissions-dialog-description"
    >
      <DialogTitle
        id="permissions-dialog-title"
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
        <FormGroup>
          {Object.entries(permissions).map(([key, value]) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  size="small"
                  checked={value}
                  onChange={(e) => handlePermissionValue(key, e.target.checked)}
                  sx={{
                    "&.Mui-checked": {
                      color: "#1d3f6b",
                    },
                  }}
                />
              }
              label={key.replace(/_/g, " ")} // format the label nicely
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "#1d3f6b",
          borderTop: "2px solid #383315",
        }}
      >
        <Button sx={{ color: "white" }} onClick={onClose}>
          Cancel
        </Button>
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            handlePermissionChange(permissions);
            onClose();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Users = () => {
  const [edit, setEdit] = useState(0);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectName, setSelectName] = useState("");
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [updateUser, setUpdateUser] = useState({});

  const fetchUrl = `https://fleet-demo.maflink.com/api/api/users?role=${encodeURIComponent(
    ""
  )}`;
  const [data, fetchData] = useFetch(fetchUrl);

  const token = sessionStorage.getItem("token");
  const updateUrl =
    `https://fleet-demo.maflink.com/api/api/users/update/` + edit;

  const { loading, error, confirmation, update } = useUpdate(updateUrl);

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    data && setUsers(data);
  }, [data]);

  const handleEdit = (r) => {
    setEdit(r);
  };

  const handlePermissionChange = (changedValue) => {
    setUpdateUser((prevState) => {
      const newState = {
        ...prevState,
        permissions: changedValue,
      };
      return newState;
    });
  };

  console.log(users);

  const handlePermission = () => {
    // setPermissions({});
    setOpen(true);
  };

  const handleUpdate = async () => {
    await update(updateUser, token);
    setEdit(0);

    //update users
    fetchData();
  };

  // console.log(users);
  const handleDelete = (id, name) => {
    setEdit(id);
    setDeleteConfirmation(!deleteConfirmation);
    setSelectName(name);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper>
          {deleteConfirmation && (
            <UserDeleteConfirmation
              user_name={selectName}
              status="Deleted"
              url={updateUrl}
              handleEdit={handleEdit}
            />
          )}

          <TableContainer>
            <EnhancedTableToolbar />
            <Table>
              <TableHead
                sx={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  backgroundColor: "white",
                }}
              >
                <TableRow>
                  {headCells.map((headCell, index) => (
                    <TableCell
                      key={index}
                      sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                    >
                      {headCell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(
                  (user, index) =>
                    user.status !== "Deleted" && (
                      <TableRow key={index} hover>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell
                          contentEditable={user.id === edit}
                          sx={{ whiteSpace: "nowrap" }}
                          onBlur={(e) =>
                            setUpdateUser({
                              ...updateUser,
                              full_name: e.target.textContent,
                            })
                          }
                        >
                          {user.full_name}
                        </TableCell>
                        <TableCell
                          sx={{ whiteSpace: "nowrap" }}
                          onBlur={(e) =>
                            setUpdateUser({
                              ...updateUser,
                              user_name: e.target.textContent,
                            })
                          }
                        >
                          {user.user_name}
                        </TableCell>
                        <TableCell
                          contentEditable={user.id === edit}
                          sx={{ whiteSpace: "nowrap" }}
                          onBlur={(e) =>
                            setUpdateUser({
                              ...updateUser,
                              company_id: e.target.textContent,
                            })
                          }
                        >
                          {user.company_id}
                        </TableCell>
                        <TableCell
                          contentEditable={user.id === edit ? true : false}
                          sx={{ whiteSpace: "nowrap" }}
                          onBlur={(e) =>
                            setUpdateUser({
                              ...updateUser,
                              password: e.target.textContent,
                            })
                          }
                        >
                          ***********
                        </TableCell>
                        <TableCell
                          // contentEditable={
                          //   user.role !== "Manager" && user.id === edit
                          // }
                          sx={{ whiteSpace: "nowrap" }}
                          onBlur={(e) =>
                            setUpdateUser({
                              ...updateUser,
                              role: e.target.textContent,
                            })
                          }
                        >
                          {user.role}
                        </TableCell>
                        <TableCell>
                          {user.id === edit ? (
                            <Switch
                              defaultChecked={user.status === "Active"}
                              onChange={() =>
                                setUpdateUser({
                                  ...updateUser,
                                  status:
                                    user.status === "Active"
                                      ? "Inactive"
                                      : "Active",
                                })
                              }
                            />
                          ) : (
                            <Button
                              size="small"
                              variant="contained"
                              sx={{
                                backgroundColor:
                                  user.status === "Active"
                                    ? "#00b700"
                                    : "#e50140",
                                textTransform: "none",
                              }}
                            >
                              {user.status}
                            </Button>
                          )}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {user.updated_at
                            ? format(
                                toZonedTime(
                                  new Date(user.updated_at),
                                  userTimezone
                                ),
                                "yyyy-MM-dd HH:mm:ss"
                              )
                            : ""}
                        </TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            disabled={user.id !== edit}
                            variant="contained"
                            onClick={handlePermission}
                            sx={{
                              width: 100,
                              backgroundColor: "#1d3f6b",
                              textTransform: "none",
                              color: "white",
                            }}
                          >
                            <VisibilityOutlinedIcon /> View
                          </Button>
                        </TableCell>
                        <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                          <ButtonGroup sx={{ width: 210 }}>
                            <Box
                              sx={{
                                width: 100,
                                backgroundColor:
                                  user.id !== edit ? "#1d3f6b" : "#124c97",
                                borderRadius: "3px 0px 0px 3px",
                              }}
                            >
                              {user.id !== edit ? (
                                <Button
                                  disabled={
                                    user.role !== "Manager" &&
                                    !JSON.parse(
                                      sessionStorage.getItem("permissions")
                                    ).update_user
                                  }
                                  size="small"
                                  variant="text"
                                  sx={{
                                    width: 100,
                                    color: "white",
                                    textTransform: "none",
                                  }}
                                  onClick={() => {
                                    setEdit(user.id);
                                    setUpdateUser({
                                      ...updateUser,
                                      permissions: user.permissions,
                                    });
                                  }}
                                >
                                  <Tooltip title="Click to edit">
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                      }}
                                    >
                                      <EditNoteIcon />
                                      <Typography>Edit</Typography>
                                    </Box>
                                  </Tooltip>
                                </Button>
                              ) : (
                                <Button
                                  size="small"
                                  variant="text"
                                  sx={{
                                    width: 100,
                                    color: "white",
                                    textTransform: "none",
                                  }}
                                  onClick={handleUpdate}
                                >
                                  <Tooltip title="Click to save">
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                      }}
                                    >
                                      <SaveOutlinedIcon />
                                      <Typography>Save</Typography>
                                    </Box>
                                  </Tooltip>
                                </Button>
                              )}
                            </Box>
                            <Box
                              sx={{
                                width: 100,
                                // backgroundColor: "#1d3f6b",
                                borderRadius: "0px 3px 3px 0px",
                              }}
                            >
                              {user.role !== "Manager" && (
                                <Button
                                  disabled={
                                    user.role !== "Manager" &&
                                    !JSON.parse(
                                      sessionStorage.getItem("permissions")
                                    ).delete_user
                                  }
                                  onClick={() =>
                                    handleDelete(user.id, user.user_name)
                                  }
                                  size="small"
                                  variant="text"
                                  sx={{
                                    width: 100,
                                    color: "white",
                                    textTransform: "none",
                                    backgroundColor: "#e50140",
                                  }}
                                >
                                  <Tooltip title={`Delete ${user.user_name}`}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                      }}
                                    >
                                      <DeleteSweepIcon />
                                      <Typography>Delete</Typography>
                                    </Box>
                                  </Tooltip>
                                </Button>
                              )}
                            </Box>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    )
                )}
                {open && (
                  <PermissionsDialog
                    handlePermissionChange={handlePermissionChange}
                    users={users.find((user) => user.id === edit)} // Assuming you want to pass the currently editing user
                    open={open}
                    onClose={() => setOpen(false)}
                  />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={!data || loading}
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
            {loading ? "Updating ..." : "Loading ..."}
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
};

export default Users;
