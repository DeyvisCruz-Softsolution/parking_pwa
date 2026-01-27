import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import type { Turn } from '../../types/Turn';
import { TurnContext } from './TurnContext';
import { useAuth } from '../auth/hooks';

export const TurnProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  const [activeTurn, setActiveTurn] = useState<Turn | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);

  /**
   * ▶️ Activar turno (empleado)
   */
  const activateTurn = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('turns')
      .select('*')
      .eq('employee_id', user.id)
      .eq('status', 'pendiente')
      .order('start_time')
      .limit(1)
      .single();

    if (error || !data) {
      alert('No hay turnos pendientes');
      return;
    }

    await supabase
      .from('turns')
      .update({ status: 'activo' })
      .eq('id', data.id);

    setActiveTurn({ ...data, status: 'activo' });
  };

  /**
   * 🔄 CARGA INICIAL DE TURNOS (FETCH REAL)
   */
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      // 🔹 Turno activo
      const { data: active } = await supabase
        .from('turns')
        .select('*')
        .eq('employee_id', user.id)
        .eq('status', 'activo')
        .maybeSingle();

      setActiveTurn(active ?? null);

      // 🔹 Lista de turnos
      const query = supabase.from('turns').select('*').order('start_time');

      const { data: list } =
        user.role === 'admin'
          ? await query
          : await query.eq('employee_id', user.id);

      setTurns(list ?? []);
    };

    loadData();
  }, [user]);

  return (
    <TurnContext.Provider
      value={{
        activeTurn,
        turns,
        activateTurn,
        reloadActiveTurn: async () => {}, // mantenido por compatibilidad
      }}
    >
      {children}
    </TurnContext.Provider>
  );
};
