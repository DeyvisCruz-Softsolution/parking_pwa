import { useEffect, useState, useCallback } from "react"
import { supabase } from "../../utils/supabaseClient"
import type { Turn } from "../../types/Turn"
import { TurnContext } from "./TurnContext"
import type { TurnContextProps } from "./TurnContext"
import { useAuth } from "../auth/hooks"

export const TurnProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const [activeTurn, setActiveTurn] = useState<Turn | null>(null)
  const [turns, setTurns] = useState<Turn[]>([])

  const activateTurn = async (): Promise<void> => {
    if (!user) return
    const { data, error } = await supabase
      .from("turns")
      .select("*")
      .eq("employee_id", user.id)
      .eq("status", "pendiente")
      .order("start_time")
      .limit(1)
      .single()

    if (error || !data) {
      alert("No hay turnos pendientes")
      return
    }

    await supabase.from("turns").update({ status: "activo" }).eq("id", data.id)
    setActiveTurn({ ...data, status: "activo" })
  }

  const extendTurn = async (
    pin: string,
    minutes: number
  ): Promise<{ success: boolean; new_end_time?: string; error?: string }> => {
    if (!activeTurn) return { success: false, error: "No hay turno activo" }

    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const access_token = sessionData?.session?.access_token
      if (!access_token) return { success: false, error: "Usuario no autorizado" }

      const res = await fetch(
        "https://xgoiertpompdgxubhuwf.supabase.co/functions/v1/extend-turn-with-pin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({ pin, minutes }),
        }
      )

      const data = await res.json()
      if (!res.ok) return { success: false, error: data.error || "Error desconocido" }

      setActiveTurn((prev) =>
        prev ? { ...prev, end_time: data.new_end_time } : prev
      )

      return { success: true, new_end_time: data.new_end_time }
    } catch (err) {
      console.error(err)
      return { success: false, error: "Error de conexión" }
    }
  }

  // 🔄 Función para recargar todos los turnos
  const refreshTurns = useCallback(async () => {
    if (!user) return

    const query = supabase.from("turns").select("*").order("start_time")
    const { data: list } =
      user.role === "admin" ? await query : await query.eq("employee_id", user.id)
    setTurns(list ?? [])

    const { data: active } = await supabase
      .from("turns")
      .select("*")
      .eq("employee_id", user.id)
      .eq("status", "activo")
      .maybeSingle()
    setActiveTurn(active ?? null)
  }, [user])

  // Cargar turnos al montar o cuando cambie el usuario
 useEffect(() => {
  if (!user) return
  const loadTurns = async () => {
    await refreshTurns()
  }
  loadTurns()
}, [user, refreshTurns])


  const contextValue: TurnContextProps = {
    activeTurn,
    turns,
    activateTurn,
    extendTurn,
    reloadActiveTurn: refreshTurns, // mantiene compatibilidad
    refreshTurns, // ahora sí existe en el context según TurnContextProps
  }

  return <TurnContext.Provider value={contextValue}>{children}</TurnContext.Provider>
}
