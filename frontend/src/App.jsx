import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";

import Employees from "./pages/Employees";
import Shifts from "./pages/Shifts";
import Attendance from "./pages/Attendance";
import Requests from "./pages/Requests";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/Admin"
        element={<Admin />}
      />

      <Route
        path="/Employee"
        element={<Employee />}
      />

      <Route
        path="/Employees"
        element={<Employees />}
      />

      <Route
        path="/Shifts"
        element={<Shifts />}
      />

      <Route
        path="/Attendance"
        element={<Attendance />}
      />

      <Route
        path="/Requests"
        element={<Requests />}
      />

    </Routes>
  );
}

export default App;