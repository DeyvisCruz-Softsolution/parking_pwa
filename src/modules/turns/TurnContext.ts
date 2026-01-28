import type { Turn } from "../../types/Turn"

export interface TurnContextProps {
  activeTurn: Turn | null
  turns: Turn[]
  activateTurn: () => Promise<void>
  extendTurn: (
    pin: string,
    minutes: number
  ) => Promise<{ success: boolean; new_end_time?: string; error?: string }>
  reloadActiveTurn: () => Promise<void>

  // 🔹 NUEVO: función para recargar todos los turnos
  refreshTurns: () => Promise<void>
}

import { createContext } from "react"

export const TurnContext = createContext<TurnContextProps | null>(null)
