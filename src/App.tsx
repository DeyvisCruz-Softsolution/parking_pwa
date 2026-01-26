import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./modules/auth/AuthProvider";
import { Login } from "./modules/auth/Login";
import { PrivateRoute } from "./routes/PrivateRoute";
import Dashboard from "./modules/dashboard/Dashboard";
import { RegisterEmployee } from "./modules/auth/RegisterEmployee";
// Páginas de ejemplo para los enlaces del menú (futuro)
// import TurnsPage from './modules/turns/TurnsPage';
// import RatesPage from './modules/rates/RatesPage';
// import InventoryPage from './modules/inventory/InventoryPage';
// import ActivateTurnPage from './modules/turns/ActivateTurnPage';
// import VehicleEntryPage from './modules/vehicles/VehicleEntry';
// import VehicleExitPage from './modules/vehicles/VehicleExit';
// import SalesPage from './modules/sales/SalesForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Página de login */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard protegido (acceso admin o empleado) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={["admin", "empleado"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Registro de empleados (solo admin) */}
          <Route
            path="/register-employee"
            element={
              <PrivateRoute roles={["admin"]}>
                <RegisterEmployee />
              </PrivateRoute>
            }
          />

          {/* Rutas futuras (solo admin) */}
          {/* 
          <Route
            path="/turns"
            element={
              <PrivateRoute roles={['admin']}>
                <TurnsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/rates"
            element={
              <PrivateRoute roles={['admin']}>
                <RatesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute roles={['admin']}>
                <InventoryPage />
              </PrivateRoute>
            }
          />
          */}

          {/* Rutas futuras (solo empleado) */}
          {/* 
          <Route
            path="/activate-turn"
            element={
              <PrivateRoute roles={['empleado']}>
                <ActivateTurnPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/vehicle-entry"
            element={
              <PrivateRoute roles={['empleado']}>
                <VehicleEntryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/vehicle-exit"
            element={
              <PrivateRoute roles={['empleado']}>
                <VehicleExitPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <PrivateRoute roles={['empleado']}>
                <SalesPage />
              </PrivateRoute>
            }
          />
          */}

          {/* Redirección general: si ruta no existe, ir a login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
