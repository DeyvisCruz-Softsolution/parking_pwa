import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./modules/auth/AuthProvider";
import { Login } from "./modules/auth/Login";
import { PrivateRoute } from "./routes/PrivateRoute";
import Dashboard from "./modules/dashboard/Dashboard";
import { RegisterEmployee } from "./modules/auth/RegisterEmployee";

/* TURNOS */
import { TurnProvider } from "./modules/turns/TurnProvider";
import TurnList from "./modules/turns/TurnList";
import ActivateTurn from "./modules/turns/ActivateTurn";

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

            {/* Registrar empleado (solo admin) */}
            <Route
              path="/register-employee"
              element={
                <PrivateRoute roles={["admin"]}>
                  <RegisterEmployee />
                </PrivateRoute>
              }
            />

            {/* LISTA DE TURNOS (admin ve todos, empleado solo los suyos) */}
            <Route
              path="/turns"
              element={
                <PrivateRoute roles={["admin", "empleado"]}>
                  <TurnList />
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
