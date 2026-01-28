// src/modules/turns/components/AdminActions.tsx
import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Dialog } from "../../../components/ui/Dialog";
import { Input } from "../../../components/ui/Input";
import { supabase } from "../../../utils/supabaseClient";

interface AdminActionsProps {
  employeeId: string;
  refreshTurns: () => void;
}

export const AdminActions = ({ employeeId, refreshTurns }: AdminActionsProps) => {
  const [pin, setPin] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [openCloseDialog, setOpenCloseDialog] = useState(false);
  const [openExtendDialog, setOpenExtendDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCloseTurn = async () => {
    if (!pin) return setMessage("Ingrese un PIN válido");
    setLoading(true);
    setMessage("");
    try {
      const session = await supabase.auth.getSession();
      const res = await fetch("/.netlify/functions/close-turn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.session?.access_token}`,
        },
        body: JSON.stringify({ pin, employeeId }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Turno cerrado correctamente ✅");
        setPin("");
        setOpenCloseDialog(false);
        refreshTurns();
      } else {
        setMessage(data.error || "Error cerrando turno");
      }
    } catch {
      setMessage("Error interno");
    }
    setLoading(false);
  };

  const handleExtendTurn = async () => {
    if (!pin || !minutes) return setMessage("Ingrese PIN y minutos válidos");
    setLoading(true);
    setMessage("");
    try {
      const session = await supabase.auth.getSession();
      const res = await fetch("/.netlify/functions/extend-turn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.data.session?.access_token}`,
        },
        body: JSON.stringify({ pin, minutes, employeeId }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Turno extendido hasta ${new Date(data.new_end_time).toLocaleTimeString()}`);
        setPin("");
        setMinutes(0);
        setOpenExtendDialog(false);
        refreshTurns();
      } else {
        setMessage(data.error || "Error extendiendo turno");
      }
    } catch {
      setMessage("Error interno");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={() => setOpenCloseDialog(true)} variant="destructive">
        Cerrar turno
      </Button>
      <Button onClick={() => setOpenExtendDialog(true)} variant="secondary">
        Extender turno
      </Button>

      <Dialog open={openCloseDialog} onClose={() => setOpenCloseDialog(false)} title="Cerrar Turno">
        <Input placeholder="Ingrese PIN de administrador" value={pin} onChange={(e) => setPin(e.target.value)} />
        <Button onClick={handleCloseTurn} className="mt-2" disabled={loading}>
          {loading ? "Procesando..." : "Cerrar Turno"}
        </Button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </Dialog>

      <Dialog open={openExtendDialog} onClose={() => setOpenExtendDialog(false)} title="Extender Turno">
        <Input placeholder="Ingrese PIN de administrador" value={pin} onChange={(e) => setPin(e.target.value)} />
        <Input
          type="number"
          placeholder="Minutos a extender"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className="mt-2"
        />
        <Button onClick={handleExtendTurn} className="mt-2" disabled={loading}>
          {loading ? "Procesando..." : "Extender Turno"}
        </Button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </Dialog>
    </div>
  );
};
