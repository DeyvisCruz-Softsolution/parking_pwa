import { useTurn } from './useTurn';


const ActivateTurn = () => {
  const { activateTurn, reloadActiveTurn, activeTurn } = useTurn();

  const handleActivate = async () => {
    await activateTurn();
    await reloadActiveTurn();
  };

  if (activeTurn) {
    return <p>Ya tienes un turno activo</p>;
  }

  return <button onClick={handleActivate}>Activar Turno</button>;
};

export default ActivateTurn;
