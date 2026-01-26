import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export const RegisterEmployee = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        throw new Error("Sesión no válida");
      }

      const res = await fetch(
        "https://xgoiertpompdgxubhuwf.supabase.co/functions/v1/clever-action",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email,
            password,
            role: "empleado",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error creando empleado");
      }

      setMessage(`Empleado creado correctamente: ${email}`);
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(
        err instanceof Error ? `Error: ${err.message}` : "Error desconocido"
      );
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
