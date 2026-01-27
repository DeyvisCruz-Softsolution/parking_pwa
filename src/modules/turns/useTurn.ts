import { useContext } from 'react';
import { TurnContext } from './TurnContext';

export const useTurn = () => {
  const context = useContext(TurnContext);

  if (!context) {
    throw new Error('useTurn must be used within TurnProvider');
  }

  return context;
};
