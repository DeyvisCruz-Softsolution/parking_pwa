import { useAuth } from '../auth/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../services/auth'

export const DashboardMenu = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Error al cerrar sesión', error)
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Bienvenido, {user?.email}</h2>

        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      {user?.role === 'admin' ? (
  <ul className="space-y-2">
    <li>
      <Link to="/dashboard-admin">Dashboard</Link>
    </li>
    <li>
      <Link to="/register-employee">Registrar Empleado</Link>
    </li>
    <li>
      <Link to="/turns">Gestionar Turnos</Link>
    </li>
    <li>
      <Link to="/rates">Configurar Tarifas</Link>
    </li>
    <li>
      <Link to="/inventory">Inventario / Productos</Link>
    </li>
  </ul>
      ) : (
        <ul className="space-y-2">
          <li>
            <Link to="/activate-turn">Activar Turno</Link>
          </li>
          <li>
            <Link to="/vehicle-entry">Registrar Entrada Vehículo</Link>
          </li>
          <li>
            <Link to="/vehicle-exit">Registrar Salida Vehículo</Link>
          </li>
          <li>
            <Link to="/sales">Registrar Venta</Link>
          </li>
        </ul>
      )}
    </div>
  )
}
