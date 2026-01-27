import type { Turn } from '../../types/Turn';
import { useTurn } from './useTurn';

const TurnList = () => {
  const { turns } = useTurn();

  return (
    <div>
      <h2>Turnos</h2>
      <ul>
        {turns.map((turn: Turn) => (
          <li key={turn.id}>
            {turn.employee_id} - {turn.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TurnList;
