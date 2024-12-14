import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm, Controller } from "react-hook-form";
import usePost from "../../hook/usePost";
import Notification from "../../services/notification";

export default function NewVehicle() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const [vehicle, setVehicle] = useState({});

  const token = sessionStorage.getItem("token");
  const url = "https://fleet-demo.maflink.com/api/api/vehicle";

  const { loading, error, confirmation, post } = usePost(url);

  const OnSubmit = (vehicle) => {
    vehicle.last_service = dayjs(vehicle.last_service).format("YYYY-MM-DD");
    vehicle.next_service = dayjs(vehicle.next_service).format("YYYY-MM-DD");

    vehicle.data_encoder = sessionStorage.getItem("full_name");

    post(vehicle, token);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setVehicle({ ...vehicle, [field]: value });
    setValue(field, value);
  };

  const handleDateChange = (field) => (date) => {
    setVehicle({ ...vehicle, [field]: date });
    setValue(field, date);
  };

  return (
    <Box sx={{ maxWidth: 1200 }}>
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
            p: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AddIcon />
          <Typography color="inherit" variant="h6">
            New Vehicle
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
              flexWrap: "wrap",
              gap: 3,
              "& .MuiTextField-root": { m: 1, width: "21ch" },
            }}
          >
            <Controller
              name="vehicle_id"
              control={control}
              defaultValue=""
              rules={{ required: "Vehicle id  is required" }}
              render={({ field }) => (
                <FormControl variant="standard" sx={{ m: 1, width: "21ch" }}>
                  <InputLabel>
                    Vehicle id <span style={{ color: "#e50140" }}>*</span>
                  </InputLabel>
                  <Input
                    {...field}
                    onChange={handleChange("vehicle_id")}
                    error={Boolean(errors.vehicle_id)}
                  />
                  {errors.vehicle_id && (
                    <p
                      style={{
                        color: "#e50140",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      {errors.vehicle_id.message}
                    </p>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="make"
              control={control}
              defaultValue=""
              rules={{ required: "Make is required" }}
              render={({ field }) => (
                <FormControl variant="standard" sx={{ m: 1, width: "21ch" }}>
                  <InputLabel>
                    Make <span style={{ color: "#e50140" }}>*</span>
                  </InputLabel>
                  <Input
                    {...field}
                    onChange={handleChange("make")}
                    error={Boolean(errors.make)}
                  />
                  {errors.make && (
                    <p
                      style={{
                        color: "#e50140",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      {errors.make.message}
                    </p>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <FormControl variant="standard" sx={{ m: 1, width: "21ch" }}>
                  <InputLabel>
                    Category <span style={{ color: "#e50140" }}>*</span>
                  </InputLabel>
                  <Select
                    {...field}
                    onChange={handleChange("category")}
                    error={Boolean(errors.category)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {["Cars", "Vans", "Light truck", "Heavy truck"].map(
                      (category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {errors.category && (
                    <p
                      style={{
                        color: "#e50140",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      {errors.category.message}
                    </p>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="model"
              control={control}
              defaultValue=""
              rules={{ required: "Model is required" }}
              render={({ field }) => (
                <FormControl variant="standard" sx={{ m: 1, width: "21ch" }}>
                  <InputLabel>
                    Model <span style={{ color: "#e50140" }}>*</span>
                  </InputLabel>
                  <Input
                    {...field}
                    onChange={handleChange("model")}
                    error={Boolean(errors.model)}
                  />
                  {errors.model && (
                    <p
                      style={{
                        color: "#e50140",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      {errors.model.message}
                    </p>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="year"
              control={control}
              defaultValue=""
              rules={{ required: "Year is required" }}
              render={({ field }) => (
                <FormControl variant="standard" sx={{ m: 1, width: "21ch" }}>
                  <InputLabel>
                    Year <span style={{ color: "#e50140" }}>*</span>
                  </InputLabel>
                  <Input
                    {...field}
                    type="text"
                    onChange={handleChange("year")}
                    error={Boolean(errors.year)}
                  />
                  {errors.year && (
                    <p
                      style={{
                        color: "#e50140",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      {errors.year.message}
                    </p>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="license_plate"
              control={control}
              defaultValue=""
              rules={{ required: "License plate unit is required" }}
              render={({ field }) => (
                <FormControl variant="standard" sx={{ m: 1, width: "21ch" }}>
                  <InputLabel>
                    License plate <span style={{ color: "#e50140" }}>*</span>
                  </InputLabel>
                  <Input
                    {...field}
                    type="text"
                    onChange={handleChange("license_plate")}
                    error={Boolean(errors.license_plate)}
                  />
                  {errors.license_plate && (
                    <p
                      style={{
                        color: "#e50140",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      {errors.license_plate.message}
                    </p>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="status"
              control={control}
              defaultValue=""
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <FormControl variant="standard" sx={{ m: 1, width: "21ch" }}>
                  <InputLabel>
                    Status <span style={{ color: "#e50140" }}>*</span>
                  </InputLabel>
                  <Select
                    {...field}
                    onChange={handleChange("status")}
                    error={Boolean(errors.status)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {["Available", "In use", "Service"].map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.status && (
                    <p
                      style={{
                        color: "#e50140",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      {errors.status.message}
                    </p>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="fuel_type"
              control={control}
              defaultValue=""
              rules={{ required: "Fuel type is required" }}
              render={({ field }) => (
                <FormControl variant="standard" sx={{ m: 1, width: "21ch" }}>
                  <InputLabel>
                    Fuel type <span style={{ color: "#e50140" }}>*</span>
                  </InputLabel>
                  <Select
                    {...field}
                    onChange={handleChange("fuel_type")}
                    error={Boolean(errors.fuel_type)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {["Benzene", "Nafta"].map((fuel_type) => (
                      <MenuItem key={fuel_type} value={fuel_type}>
                        {fuel_type}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.fuel_type && (
                    <p
                      style={{
                        color: "#e50140",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      {errors.fuel_type.message}
                    </p>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="mileage"
              control={control}
              defaultValue=""
              rules={{ required: "Mileage unit is required" }}
              render={({ field }) => (
                <FormControl variant="standard" sx={{ m: 1, width: "21ch" }}>
                  <InputLabel>
                    Mileage <span style={{ color: "#e50140" }}>*</span>
                  </InputLabel>
                  <Input
                    {...field}
                    type="text"
                    onChange={handleChange("mileage")}
                    error={Boolean(errors.mileage)}
                  />
                  {errors.mileage && (
                    <p
                      style={{
                        color: "#e50140",
                        fontSize: "0.8rem",
                        margin: 0,
                      }}
                    >
                      {errors.mileage.message}
                    </p>
                  )}
                </FormControl>
              )}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit(OnSubmit)}
            sx={{
              mt: 2,
              backgroundColor: " #1d3f6b",
              "&:hover": { backgroundColor: "#124c97" },
            }}
          >
            Submit
          </Button>
          {confirmation && <Notification message={confirmation.message} />}
          {error && <Notification message={error} color="#e50140" />}
        </FormGroup>
      </Paper>

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
            Submitting ...
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}
