import { useAuth } from '../auth/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from "../../utils/supabaseClient"

export const DashboardMenu = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
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
          Cerrar sesión Actual
        </button>
      </div>

      {user?.role === 'admin' ? (
        <ul className="space-y-2">
          <li>
            <Link to="/register-employee" className="text-blue-500 hover:underline">
              Registrar Empleado
            </Link>
          </li>
          <li>
            <Link to="/turns" className="text-blue-500 hover:underline">
              Gestionar Turnos
            </Link>
          </li>
          <li>
            <Link to="/rates" className="text-blue-500 hover:underline">
              Configurar Tarifas
            </Link>
          </li>
          <li>
            <Link to="/inventory" className="text-blue-500 hover:underline">
              Inventario / Productos
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="space-y-2">
          <li>
            <Link to="/activate-turn" className="text-blue-500 hover:underline">
              Activar Turno
            </Link>
          </li>
          <li>
            <Link to="/vehicle-entry" className="text-blue-500 hover:underline">
              Registrar Entrada Vehículo
            </Link>
          </li>
          <li>
            <Link to="/vehicle-exit" className="text-blue-500 hover:underline">
              Registrar Salida Vehículo
            </Link>
          </li>
          <li>
            <Link to="/sales" className="text-blue-500 hover:underline">
              Registrar Venta
            </Link>
          </li>
        </ul>
      )}
    </div>
  )
}
