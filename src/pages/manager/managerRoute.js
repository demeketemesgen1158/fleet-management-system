import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../components/dashboard/dashboard";
import AddUser from "../../components/userManagement/addUser";
import Users from "../../components/userManagement/user";
import Vehicle from "../../components/vehicle/vehicle";
import NewVehicle from "../../components/vehicle/newVehicle";

export default function ManagerRoute({
  date_start,
  date_end,
  handleDateSelector,
}) {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Dashboard Route */}
        <Route
          path="/"
          element={
            <Dashboard
              date_start={date_start}
              date_end={date_end}
              handleDateSelector={handleDateSelector}
            />
          }
        />
        {/* Other Routes */}
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/users" element={<Users />} />
        <Route path="/vehicles" element={<Vehicle />} />
        <Route path="/new-vehicle" element={<NewVehicle />} />

        {/* Fallback Route for Undefined Paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
