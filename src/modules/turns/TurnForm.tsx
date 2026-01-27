import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export const TurnForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const saveTurn = async () => {
    await supabase.from('turns').insert({
      employee_id: employeeId,
      start_time: start,
      end_time: end,
      status: 'pendiente',
    });
    alert('Turno creado');
  };

  return (
    <div>
      <input placeholder="Empleado ID" onChange={e => setEmployeeId(e.target.value)} />
      <input type="datetime-local" onChange={e => setStart(e.target.value)} />
      <input type="datetime-local" onChange={e => setEnd(e.target.value)} />
      <button onClick={saveTurn}>Crear Turno</button>
    </div>
  );
};
