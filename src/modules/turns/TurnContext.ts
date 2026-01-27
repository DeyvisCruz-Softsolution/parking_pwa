import { createContext } from 'react';
import type { Turn } from '../../types/Turn';

export interface TurnContextProps {
  activeTurn: Turn | null;
  turns: Turn[];
  activateTurn: () => Promise<void>;
  reloadActiveTurn: () => Promise<void>;
}

export const TurnContext = createContext<TurnContextProps | null>(null);
