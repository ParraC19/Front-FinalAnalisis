import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginForm({ onSwitchToRegister, onSwitchToForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate("/ventas", { replace: true });
    } catch {
      setError("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-gray-500 p-8 rounded-4xl"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">
        Iniciar Sesión
      </h2>
      <p className="text-sm sm:text-base text-white mb-6 text-center">
        Ingresa tus datos para acceder
      </p>

      <div className="mb-4">
        <label className="font-semibold text-sm text-white pb-1 block">
          Correo
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:px-2 focus:outline-none caret-white focus:placeholder-transparent focus:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="font-semibold text-sm text-white pb-1 block">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:px-2 focus:outline-none caret-white focus:placeholder-transparent focus:text-white"
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 mb-3" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="py-2 px-4 bg-white hover:scale-[1.05] text-gray-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md cursor-pointer rounded-xl disabled:opacity-60"
      >
        {loading ? "Ingresando..." : "Iniciar Sesión"}
      </button>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onSwitchToForgot}
          className="text-sm text-white hover:scale-[1.05] uppercase tracking-wide transition block w-full mb-2"
        >
          ¿Olvidaste tu contraseña?
        </button>
        <span className="text-white text-sm">¿No tienes cuenta?</span>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-sm text-white hover:scale-[1.05] uppercase tracking-wide transition block w-full mt-2"
        >
          Registrate
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
