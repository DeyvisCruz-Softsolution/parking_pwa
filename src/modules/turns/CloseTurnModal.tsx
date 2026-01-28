import { useState } from "react"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card"
import { X } from "lucide-react"

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (pin: string) => void
}

const CloseTurnModal = ({ open, onClose, onSubmit }: Props) => {
  const [pin, setPin] = useState("")
  const [loading, setLoading] = useState(false)

  if (!open) return null

  const handleSubmit = async () => {
    setLoading(true)
    await onSubmit(pin)
    setPin("")
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="w-80 p-4 relative">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Cerrar turno</CardTitle>
          <Button variant="secondary" onClick={onClose} className="p-1">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="pin">PIN de autorización</Label>
            <Input
              id="pin"
              type="password"
              placeholder="Ingresa PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Cerrando..." : "Cerrar turno"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CloseTurnModal
