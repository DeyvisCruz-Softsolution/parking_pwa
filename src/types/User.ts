export type Role = 'admin' | 'empleado';

export interface User {
  id: string;
  email: string;
  role: Role;
}
