import { useState } from "react"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Dialog } from "../../components/ui/Dialog"

interface ExtendTurnModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (pin: string) => void
}

export default function ExtendTurnModal({ open, onClose, onSubmit }: ExtendTurnModalProps) {
  const [pin, setPin] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!pin) return
    setLoading(true)
    try {
      await onSubmit(pin)
      setPin("")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <Dialog open={open} onClose={onClose} title="Extender Turno">
      <div className="sm:max-w-[425px] space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="pin">PIN de autorización</Label>
          <Input
            id="pin"
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
