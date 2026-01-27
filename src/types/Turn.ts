export type TurnStatus = 'pendiente' | 'activo' | 'finalizado';

export interface Turn {
  id: string;
  employee_id: string;
  start_time: string;
  end_time: string;
  status: TurnStatus;
}
