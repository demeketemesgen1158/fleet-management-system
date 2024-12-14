import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";

import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import AppsIcon from "@mui/icons-material/Apps";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Divider from "@mui/material/Divider";
import { Button, Stack } from "@mui/material";
import { format, toZonedTime } from "date-fns-tz";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import useUpdate from "../../hook/useUpdate";
import useFetch from "../../hook/useFetch";
import ExportToExcel from "../../services/exportToExcel";
import DeleteVehicle from "./deleteVehicle";
import Select from "@mui/material/Select";

//Custom styling
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.45),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "16ch",
      "&:focus": {
        width: "31ch",
      },
    },
  },
}));

//Tablecell
const EditableCell = ({ row, edit, field, align, onBlur }) => (
  <TableCell
    onClick={(e) =>
      row.id === edit
        ? (e.target.contentEditable = true)
        : (e.target.contentEditable = false)
    }
    onBlur={(e) => onBlur(e.target.textContent)}
    align={align}
    sx={{ whiteSpace: "nowrap" }}
  >
    {row[field]}
  </TableCell>
);

//Component for table head
function EnhancedTableHead({ onSelectAllClick, numSelected, rowCount }) {
  return (
    <TableHead
      sx={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "white" }}
    >
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            sx={{
              "&.Mui-checked": {
                color: "#1d3f6b",
              },
            }}
          />
        </TableCell>
        {[
          "No",
          "Vehicle ID",
          "Make",
          "Model",
          "Category",
          "Year",
          "License Plate",
          "Status",
          "Fuel Type",
          "Mileage",
          "Last updated",
          "Data encoder",
          "Actions",
        ].map((headCell) => (
          <TableCell
            key={headCell}
            sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
          >
            {headCell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

//Dropdown view component
function Dropdown({ handleSearch }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleDropDown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleDropDown}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textTransform: "none",
          color: "black",
          color: "#3f3f3fd6",
          ml: -1,
        }}
      >
        <AppsIcon sx={{ cursor: "pointer" }} />

        <Typography sx={{ color: "black" }}>Vehicles </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={(e) => {
            handleSearch("delete");
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Deleted vehicle</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleSearch("available");
            handleClose();
          }}
        >
          <ListItemIcon>
            <LockClockOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Available vehicle</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

//Mobile dropdown view component
function MobileDropdown({ handleSearch, data }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleDropDown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: { lg: "none", md: "none", sm: "flex", xs: "flex" } }}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleDropDown}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textTransform: "none",
          color: "#3f3f3fd6",
        }}
      >
        <DragIndicatorIcon sx={{ cursor: "pointer" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem sx={{ ml: -3, p: 3 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search vehicle"
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            />
          </Search>
        </MenuItem>
        <MenuItem sx={{ ml: -0.5 }}>
          <ExportToExcel data={data} filename="vehicles.xlsx" />
        </MenuItem>{" "}
        <MenuItem
          component="a"
          href="/new-vehicle"
          sx={{
            "&:hover": { backgroundColor: "#124c97", cursor: "default" },
            width: "100%",
            backgroundColor: "#1d3f6b",
            textTransform: "none",
            color: "white",
            p: 1,
          }}
          onClick={handleClose}
        >
          <ListItemIcon>
            <AddIcon fontSize="medium" sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText sx={{ ml: 1, whiteSpace: "nowrap" }}>
            New Vehicle
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleSearch("delete");
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Deleted vehicle</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSearch("available");
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Available vehicle</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

function DateFilter({ handleDateFilter }) {
  const [fromValue, setFromValue] = React.useState(null);
  const [toValue, setToValue] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    handleDateFilter(fromValue, toValue);
  }, [fromValue, toValue]);

  return (
    <div>
      <Button
        variant="text"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          textTransform: "none",
          color: "#1d3f6b",
        }}
      >
        <FilterListOutlinedIcon fontSize="small" />
        <Typography>Filter</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box sx={{ m: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="From"
                value={fromValue}
                onChange={(newValue) => setFromValue(newValue)}
              />
              <DatePicker
                label="To"
                value={toValue}
                onChange={(newValue) => setToValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Menu>
    </div>
  );
}

//Component for table toolbar
function EnhancedTableToolbar({ handleSearch, rows, handleDateFilter }) {
  // Common styles
  const toolbarStyles = {
    width: "100%",
    display: "flex",
    alignContent: "center",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderBottom: "2px solid #1d3f6b",
    position: "sticky",
    left: 0,
    p: 2,
  };

  const stackStyles = {
    display: "flex",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 3,
  };

  const buttonStyles = {
    width: 160,
    backgroundColor: "#1d3f6b",
    textTransform: "none",
    color: "white",
    p: 1,
  };

  return (
    <Stack sx={toolbarStyles}>
      <Stack sx={stackStyles}>
        <Dropdown handleSearch={handleSearch} />
      </Stack>
      <Stack
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          flexFlow: "row nowrap",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Model, Id,  License Plate "
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Search>
        <DateFilter handleDateFilter={handleDateFilter} />
        <ExportToExcel data={rows} filename="vehicles.xlsx" />
        <Box
          sx={{
            backgroundColor: "#1d3f6b",
            borderRadius: 1,
            "&:hover": { backgroundColor: "#124c97" },
          }}
        >
          <Button href="/new-vehicle" sx={buttonStyles}>
            <AddIcon />
            <Typography sx={{ ml: 1, whiteSpace: "nowrap" }}>
              New Vehicle
            </Typography>
          </Button>
        </Box>
      </Stack>
      <MobileDropdown handleSearch={handleSearch} data={rows} />
    </Stack>
  );
}

//Collective component to be exported
export default function Vehicle() {
  const tableContainerHeight = window.innerHeight;
  const [selected, setSelected] = useState([]);
  const [edit, setEdit] = useState(0);
  const [id, setId] = useState("");
  const [selectItem, setSelectItem] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [availability, setAvailability] = useState("");
  const [date_start, setDateStart] = useState(null);
  const [date_end, setDateEnd] = useState(null);
  const [delete_confirmation, setDeleteConfirmation] = useState(false);
  const [rows, setRows] = useState([]);
  const [vehicle, setVehicle] = useState({});
  const [vehicle_id, setVehicleId] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const token = sessionStorage.getItem("token");

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const url = "https://fleet-demo.maflink.com/api/api/vehicle/" + id;

  const fetchUrl = `https://fleet-demo.maflink.com/api/api/vehicle?page=${page}&search=${encodeURIComponent(
    search
  )}&date_start=${encodeURIComponent(date_start)}&date_end=${encodeURIComponent(
    date_end
  )}`;

  const { loading, error, confirmation, update } = useUpdate(url);

  const [data, fetchData] = useFetch(fetchUrl);

  const permit = JSON.parse(sessionStorage.getItem("permissions"));

  useEffect(() => {
    data && setRows(data.data);
  }, [data]);

  function handleEdit(v) {
    setId(v);
    setEdit(v);
  }

  console.log(id);

  function handleUpdate() {
    // Use a functional update to ensure the previous state is used

    // Call update after the vehicle state is updated
    update(vehicle, token);

    setEdit(0);
    fetchData(); // Fetch data after update
  }

  const handleDelete = (id, vehicle_id) => {
    // Toggle delete confirmation based on the current state
    setDeleteConfirmation((prevState) => !prevState);
    setId(id);
    setVehicleId(vehicle_id);
    setAvailability("delete");
  };

  const handleRestore = (id, vehicle_id) => {
    // Toggle delete confirmation based on the current state
    setDeleteConfirmation((prevState) => !prevState);
    setId(id);
    setVehicleId(vehicle_id);
    setAvailability("available");
  };

  const handleDateFilter = (date_start, date_end) => {
    const formattedStartDate = date_start
      ? dayjs(date_start).format("YYYY-MM-DD")
      : null;
    const formattedEndDate = date_end
      ? dayjs(date_end).format("YYYY-MM-DD")
      : null;

    setDateStart(formattedStartDate);
    setDateEnd(formattedEndDate);
  };

  function handleSearch(s) {
    setSearch(s);
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.no);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = (event, no) => {
    const selectedIndex = selected.indexOf(no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const isSelected = (no) => selected.indexOf(no) !== -1;

  return (
    <Paper sx={{ width: "100%" }}>
      {delete_confirmation && (
        <DeleteVehicle
          name={selectItem}
          quantity={itemQuantity}
          vehicle_id={vehicle_id}
          availability={availability}
          url={url}
        />
      )}
      <EnhancedTableToolbar
        numSelected={selected.length}
        handleSearch={handleSearch}
        rows={rows}
        handleDateFilter={handleDateFilter}
      />
      <TableContainer
        sx={{
          height: `calc(${tableContainerHeight}px - 240px)`,
          overflowY: "scroll",
        }}
      >
        <Table
          sx={{ minWidth: 750, overflowY: "scroll" }}
          aria-labelledby="tableTitle"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              return (
                <TableRow
                  hover={row.availability === "available"}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{
                    cursor:
                      row.availability === "available" && edit && "pointer",
                    backgroundColor:
                      row.availability !== "available" && "#ffebc1",
                  }}
                >
                  <TableCell
                    padding="checkbox"
                    onClick={(event) => handleClick(event, row.id)}
                  >
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "#1d3f6b",
                        },
                      }}
                      checked={isItemSelected}
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <EditableCell
                    row={row}
                    edit={edit}
                    field="vehicle_id"
                    align="left"
                    onBlur={(content) =>
                      setVehicle({ ...vehicle, vehicle_id: content })
                    }
                  />{" "}
                  <EditableCell
                    row={row}
                    edit={edit}
                    field="make"
                    align="left"
                    onBlur={(content) =>
                      setVehicle({ ...vehicle, make: content })
                    }
                  />
                  <EditableCell
                    row={row}
                    edit={edit}
                    field="model"
                    align="left"
                    onBlur={(content) =>
                      setVehicle({ ...vehicle, model: content })
                    }
                  />
                  {row.id === edit ? (
                    <TableCell>
                      {" "}
                      <Select
                        defaultValue={row.category || ""}
                        onChange={(event) =>
                          setVehicle({
                            ...vehicle,
                            category: event.target.value,
                          })
                        }
                        size="small"
                      >
                        {["Vans", "Light truck", "Heavy truck"].map(
                          (category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </TableCell>
                  ) : (
                    <EditableCell
                      row={row}
                      edit={edit}
                      field="category"
                      align="left"
                    />
                  )}
                  <EditableCell
                    row={row}
                    edit={edit}
                    field="year"
                    align="left"
                    onBlur={(content) =>
                      setVehicle({
                        ...vehicle,
                        year: content,
                      })
                    }
                  />
                  <EditableCell
                    row={row}
                    edit={edit}
                    field="license_plate"
                    align="left"
                    onBlur={(content) =>
                      setVehicle({
                        ...vehicle,
                        license_plate: content,
                      })
                    }
                  />
                  {row.id === edit ? (
                    <TableCell>
                      <Select
                        defaultValue={row.status || ""}
                        onChange={(event) =>
                          setVehicle({ ...vehicle, status: event.target.value })
                        }
                        size="small"
                      >
                        {["Available", "In use", "Service"].map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  ) : (
                    <EditableCell
                      row={row}
                      edit={edit}
                      field="status"
                      align="left"
                      onBlur={(content) =>
                        setVehicle({ ...vehicle, status: content })
                      }
                    />
                  )}{" "}
                  {row.id === edit ? (
                    <TableCell>
                      <Select
                        defaultValue={row.fuel_type || ""}
                        onChange={(event) =>
                          setVehicle({
                            ...vehicle,
                            fuel_type: event.target.value,
                          })
                        }
                        size="small"
                      >
                        {["Benzene", "Naftha"].map((fuel_type) => (
                          <MenuItem key={fuel_type} value={fuel_type}>
                            {fuel_type}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  ) : (
                    <EditableCell
                      row={row}
                      edit={edit}
                      field="fuel_type"
                      align="left"
                      onBlur={(content) =>
                        setVehicle({ ...vehicle, fuel_type: content })
                      }
                    />
                  )}
                  <EditableCell
                    row={row}
                    edit={edit}
                    field="mileage"
                    align="left"
                    onBlur={(content) =>
                      setVehicle({ ...vehicle, mileage: content })
                    }
                  />
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {row.updated_at
                      ? format(
                          toZonedTime(new Date(row.updated_at), userTimezone),
                          "yyyy-MM-dd HH:mm"
                        )
                      : ""}
                  </TableCell>
                  <EditableCell
                    row={row}
                    edit={edit}
                    field="data_encoder"
                    align="left"
                  />
                  <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                    <ButtonGroup sx={{ width: 210 }}>
                      {row.availability === "available" && (
                        <Box
                          sx={{
                            width: 100,
                            backgroundColor:
                              row.id !== edit ? "#1d3f6b" : "#124c97",
                            borderRadius: "3px 0px 0px 3px",
                          }}
                        >
                          {row.id !== edit ? (
                            <Button
                              disabled={
                                !permit.update_row ||
                                row.availability !== "available"
                              }
                              size="small"
                              variant="text"
                              sx={{
                                width: 100,
                                color: "white",
                                textTransform: "none",
                              }}
                              onClick={() => handleEdit(row.id)}
                            >
                              <Tooltip title="Click to edit">
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1,
                                  }}
                                >
                                  <EditNoteIcon />
                                  <Typography> Edit</Typography>
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
                              onClick={() => handleUpdate()}
                            >
                              <Tooltip title="Click to save">
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1,
                                  }}
                                >
                                  <SaveOutlinedIcon />
                                  <Typography> Save</Typography>
                                </Box>
                              </Tooltip>
                            </Button>
                          )}
                        </Box>
                      )}

                      {row.availability === "available" ? (
                        <Box
                          sx={{
                            width: 100,
                            backgroundColor: "#cf4b4b",
                            borderRadius: "0px 3px 3px 0px",
                          }}
                        >
                          <Button
                            disabled={!permit.delete_row}
                            onClick={() => handleDelete(row.id, row.vehicle_id)}
                            size="small"
                            variant="text"
                            sx={{
                              width: 100,
                              color: "white",
                              textTransform: "none",
                              backgroundColor: "#e50140",
                            }}
                          >
                            <Tooltip title={`Delete ${row.vehicle_id}`}>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: 1,
                                }}
                              >
                                <DeleteOutlineIcon />
                                <Typography>Delete</Typography>
                              </Box>
                            </Tooltip>
                          </Button>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            width: 100,
                            backgroundColor: "#cf4b4b",
                            borderRadius: "0px 3px 3px 0px",
                          }}
                        >
                          <Button
                            disabled={!permit.update_row}
                            onClick={() =>
                              handleRestore(row.id, row.vehicle_id)
                            }
                            size="small"
                            variant="text"
                            sx={{
                              width: 100,
                              color: "white",
                              textTransform: "none",
                              backgroundColor: "red",
                            }}
                          >
                            <Tooltip title={`Restore ${row.vehicle_id}`}>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: 1,
                                }}
                              >
                                <RestoreOutlinedIcon />
                                <Typography>Restore</Typography>
                              </Box>
                            </Tooltip>
                          </Button>
                        </Box>
                      )}
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {rows.length === 0 && (
          <Typography sx={{ m: 3 }}>No vehicle found</Typography>
        )}
      </TableContainer>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 3,
          p: 2,
        }}
      >
        <Button
          disabled={data && data.current_page === 1}
          onClick={(e) => handlePageChange(e, page - 1)}
          sx={{
            textTransform: "none",
            color: data && data.current_page === 1 ? "grey" : "#1d3f6b",
          }}
        >
          <ArrowBackIosNewIcon /> Back
        </Button>
        {data && data.current_page}
        <Divider orientation="vertical" flexItem />
        {data && data.last_page}
        <Button
          disabled={data && data.last_page === data.current_page}
          onClick={(e) => handlePageChange(e, page + 1)}
          sx={{
            textTransform: "none",
            color:
              data && data.last_page === data.current_page ? "grey" : "#1d3f6b",
          }}
        >
          Next <ArrowForwardIosIcon />
        </Button>
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
    </Paper>
  );
}
