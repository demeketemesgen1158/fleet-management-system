import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useForm, Controller } from "react-hook-form";
import Manager from "./pages/manager/manager";
import usePost from "./hook/usePost";
import BackDropComp from "./services/backDropComp";

export default function ProtectedRoute() {
  const [token, setToken] = useState("");

  const url = "https://fleet-demo.maflink.com/api/api/users/login";
  const { loading, confirmation, post } = usePost(url);

  const Login = () => {
    useEffect(() => {
      if (confirmation) {
        if (confirmation.token) {
          sessionStorage.setItem("token", confirmation.token);
          sessionStorage.setItem("role", confirmation.role);
          sessionStorage.setItem("full_name", confirmation.full_name);
          sessionStorage.setItem("user_name", confirmation.user_name);
          sessionStorage.setItem(
            "permissions",
            JSON.stringify(confirmation.permissions)
          );
          setToken(confirmation.token);
        }
      }
    }, [confirmation]);

    const {
      handleSubmit,
      control,
      formState: { errors },
      setValue,
    } = useForm();
    const [user, setUser] = useState({});

    const onSubmit = () => {
      post(user, "");
    };

    const handleChange = (field) => (e) => {
      const value = e.target.value;
      setUser({ ...user, [field]: value });
      setValue(field, value);
    };

    return (
      <Box
        sx={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 3,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/bottle.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(3px)", // Adjust blur intensity
            zIndex: -1,
          },
        }}
      >
        {/* Inner content box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Light overlay for better readability
            borderRadius: 3,
            padding: 3,
            zIndex: 1,
          }}
        >
          <Stack
            sx={{
              width: "90%",
              borderBottom: "2px solid whitesmoke",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 3,
              pb: 3,
            }}
          >
            <Typography
              color="inherit"
              variant="h6"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                whiteSpace: "nowrap",
              }}
            >
              <PersonAddOutlinedIcon /> Login Form
            </Typography>
          </Stack>

          {confirmation && (
            <Typography
              sx={{
                pl: 5,
                color:
                  confirmation.message ===
                  "The provided credentials are incorrect."
                    ? "#e50140"
                    : "primary.main",
                backgroundColor:
                  confirmation.message ===
                  "The provided credentials are incorrect."
                    ? "#ffe6e6"
                    : "#e6ffed",
                padding: 1,
                borderRadius: 1,
              }}
            >
              {confirmation.message}
            </Typography>
          )}

          <FormGroup
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 3,
                "& .MuiTextField-root": { m: 1, width: "21ch" },
              }}
            >
              {[
                { name: "user_name", label: "User Name", type: "text" },
                { name: "password", label: "Password", type: "password" },
              ].map(({ name, label, type }) => (
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
                      <Input
                        {...field}
                        type={type}
                        onChange={handleChange(name)}
                        error={Boolean(errors[name])}
                      />
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
              ))}
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
                  fontSize: "1.15em",
                }}
              >
                Submit
              </Button>
            </Box>
          </FormGroup>
        </Box>
        <BackDropComp loading={loading} />
      </Box>
    );
  };

  if (sessionStorage.getItem("token")) {
    if (sessionStorage.getItem("role") === "Manager") {
      return <Manager />;
    } else {
      return <Login />;
    }
  } else {
    return <Login />;
  }
}
