import { useState } from "react";

export const RegisterEmployee = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("empleado");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/registerEmployee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error creando empleado");

      setMessage(`Empleado registrado correctamente: ${email}`);
      setEmail("");
      setPassword("");
      setRole("empleado");
    } catch (err: unknown) {
      if (err instanceof Error) setMessage(`Error: ${err.message}`);
      else setMessage("Error desconocido");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-xl mb-4 font-bold">Registrar Empleado</h2>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email del empleado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña temporal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        >
          <option value="empleado">Empleado</option>
          <option value="admin">Administrador</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};
