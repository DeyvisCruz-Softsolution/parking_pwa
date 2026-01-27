import { useState } from 'react'
import { supabase } from '../../utils/supabaseClient'

export const TurnForm = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const saveTurn = async () => {
    const { data, error } = await supabase
      .from('turns')
      .insert({
        employee_id: employeeId,
        start_time: start,
        end_time: end,
        status: 'pendiente',
      })
      .select()
      .single()

    if (error) {
      console.error('ERROR creando turno:', error)
      alert(error.message)
      return
    }

    console.log('Turno creado:', data)
    alert('Turno creado correctamente')
  }

  return (
    <div>
      <input
        placeholder="Empleado ID (UUID)"
        value={employeeId}
        onChange={e => setEmployeeId(e.target.value)}
      />
      <input type="datetime-local" onChange={e => setStart(e.target.value)} />
      <input type="datetime-local" onChange={e => setEnd(e.target.value)} />
      <button onClick={saveTurn}>Crear Turno</button>
    </div>
  )
}
