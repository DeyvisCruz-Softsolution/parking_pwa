// src/modules/dashboard/DashboardAdmin.tsx
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { DashboardMenu } from "./DashboardMenu";
import { useTurn } from "../turns/useTurn";
import { AdminActions } from "../turns/components/AdminActions";
import { format } from "date-fns";

const DashboardAdmin = () => {
  const { turns, refreshTurns } = useTurn();

  const activeTurns = turns.filter(t => t.status === "activo");
  const closedTurns = turns.filter(t => t.status !== "activo");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel Administrador</h1>

      <DashboardMenu />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Turnos Activos ({activeTurns.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-80 overflow-y-auto">
            {activeTurns.length === 0 && <p>No hay turnos activos</p>}
            {activeTurns.map(turn => (
              <div key={turn.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <p>Empleado: {turn.employee_id}</p>
                  <p>Inicio: {format(new Date(turn.start_time), "dd/MM/yyyy, HH:mm")}</p>
                  <p>Fin: {format(new Date(turn.end_time), "dd/MM/yyyy, HH:mm")}</p>
                </div>
                <AdminActions employeeId={turn.employee_id} refreshTurns={refreshTurns} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Turnos Finalizados ({closedTurns.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-80 overflow-y-auto">
            {closedTurns.length === 0 && <p>No hay turnos cerrados</p>}
            {closedTurns.map(turn => (
              <div key={turn.id} className="border-b py-2">
                <p>Empleado: {turn.employee_id}</p>
                <p>Inicio: {format(new Date(turn.start_time), "dd/MM/yyyy, HH:mm")}</p>
                <p>Fin: {format(new Date(turn.end_time), "dd/MM/yyyy, HH:mm")}</p>
                <p>Estado: {turn.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAdmin;
