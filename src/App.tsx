import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./modules/auth/AuthProvider";
import { Login } from "./modules/auth/Login";
import { PrivateRoute } from "./routes/PrivateRoute";
import Dashboard from "./modules/dashboard/Dashboard";
import { RegisterEmployee } from "./modules/auth/RegisterEmployee";

/* TURNOS */
import { TurnProvider } from "./modules/turns/TurnProvider";
import ActivateTurn from "./modules/turns/ActivateTurn";
import TurnsPage from "./modules/turns/TurnsPage";
import MyTurn from "./modules/turns/MyTurn";
import { EmployeeRoute } from "./routes/EmployeeRoute";
import DashboardAdmin from "./modules/dashboard/DashboardAdmin";

function App() {
  return (
    <AuthProvider>
      <TurnProvider>
        <Router>
          <Routes>
            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Dashboard (admin y empleado) */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute roles={["admin", "empleado"]}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
<Route
  path="/dashboard-admin"
  element={
    <PrivateRoute roles={["admin"]}>
      <DashboardAdmin />
    </PrivateRoute>
  }
/>
            {/* Registrar empleado (solo admin) */}
            <Route
              path="/register-employee"
              element={
                <PrivateRoute roles={["admin"]}>
                  <RegisterEmployee />
                </PrivateRoute>
              }
            />
{/* ACTIVAR TURNO (solo empleado) */}
<Route
  path="/activate-turn"
  element={
    <EmployeeRoute>
      <ActivateTurn />
    </EmployeeRoute>
  }
/>

            {/* LISTA DE TURNOS (solo admin) */}
            <Route
              path="/turns"
              element={
                <PrivateRoute roles={["admin"]}>
                  <TurnsPage />
                </PrivateRoute>
              }
            />

            {/* MI TURNO (solo empleado) */}
            <Route
              path="/my-turn"
              element={
                <PrivateRoute roles={["empleado"]}>
                  <MyTurn />
                </PrivateRoute>
              }
            />

            {/* ACTIVAR TURNO (solo empleado) */}
            <Route
              path="/activate-turn"
              element={
                <PrivateRoute roles={["empleado"]}>
                  <ActivateTurn />
                </PrivateRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </TurnProvider>
    </AuthProvider>
  );
}

export default App;
