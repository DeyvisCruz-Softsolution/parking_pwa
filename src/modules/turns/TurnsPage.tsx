import { TurnForm } from './TurnForm'
import TurnList from './TurnList'

const TurnsPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Turnos</h1>

      <TurnForm />

      <hr className="my-4" />

      <TurnList />
    </div>
  )
}

export default TurnsPage
