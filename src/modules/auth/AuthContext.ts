import { createContext } from 'react';
import type { User as AppUser } from '../../types/User';

interface AuthContextProps {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
