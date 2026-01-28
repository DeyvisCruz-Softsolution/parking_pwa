import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Loader2, Clock, Play, StopCircle, KeyRound } from "lucide-react"
import { useTurn } from "./useTurn"
import ExtendTurnModal from "./ExtendTurnModal"
import { toast } from "react-hot-toast"
import CloseTurnModal from "./CloseTurnModal"

export default function MyTurn() {
  const { activeTurn, activateTurn, extendTurn } = useTurn()
  const [actionLoading, setActionLoading] = useState(false)
  const [modalExtendOpen, setModalExtendOpen] = useState(false)
  const [modalCloseOpen, setModalCloseOpen] = useState(false)

  const handleOpenShift = async () => {
    setActionLoading(true)
    try {
      await activateTurn()
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading(false)
    }
  }

  const handleCloseShift = async (pin?: string) => {
    if (!pin) {
      setModalCloseOpen(true)
      return
    }
    toast.success("Turno cerrado correctamente")
    setModalCloseOpen(false)
  }

  const handleExtendTurn = async (pin: string) => {
    if (!activeTurn) return
    setActionLoading(true)
    try {
      const result = await extendTurn(pin, 15)
      if (result.success) {
        toast.success("Turno extendido correctamente")
        setModalExtendOpen(false)
      } else {
        toast.error(result.error || "PIN incorrecto")
      }
    } catch (err) {
      console.error(err)
      toast.error("Error extendiendo el turno")
    } finally {
      setActionLoading(false)
    }
  }

  if (!activeTurn && actionLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-6 w-6" />
      </div>
    )
  }

  if (!activeTurn) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Mi Turno</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">No tienes un turno activo en este momento.</p>
          <Button onClick={handleOpenShift} disabled={actionLoading} className="w-full">
            {actionLoading ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2 inline-block" />
            ) : (
              <Play className="h-4 w-4 mr-2 inline-block" />
            )}
            Activar turno
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Mi Turno Activo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                <strong>Inicio:</strong> {new Date(activeTurn.start_time).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                <strong>Fin:</strong> {new Date(activeTurn.end_time).toLocaleString()}
              </span>
            </div>
            <div>
              <strong>Estado:</strong> <span className="font-mono">{activeTurn.status}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="secondary" onClick={() => setModalExtendOpen(true)}>
              <KeyRound className="h-4 w-4 mr-2 inline-block" />
              Extender turno (PIN)
            </Button>

            <Button variant="destructive" onClick={() => handleCloseShift()}>
              <StopCircle className="h-4 w-4 mr-2 inline-block" />
              Cerrar turno
            </Button>
          </div>
        </CardContent>
      </Card>

      <ExtendTurnModal
        open={modalExtendOpen}
        onClose={() => setModalExtendOpen(false)}
        onSubmit={handleExtendTurn}
      />

      <CloseTurnModal
        open={modalCloseOpen}
        onClose={() => setModalCloseOpen(false)}
        onSubmit={handleCloseShift}
      />
    </>
  )
}
