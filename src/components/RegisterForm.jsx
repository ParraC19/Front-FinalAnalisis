import { useState } from "react";
import { registerUser } from "../data/credentials";
import { Link } from "react-router-dom";

function RegisterForm({ onSwitchToLogin }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const ok = registerUser(email.trim(), password);
    if (ok) {
      setSuccess(true);
      setTimeout(() => onSwitchToLogin?.(), 1500);
    } else {
      setError("Ya existe una cuenta con ese correo.");
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-sm text-center">
        <p className="text-sm sm:text-base text-green-400">
          Cuenta creada. Redirigiendo a iniciar sesión...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm bg-gray-500 p-8 rounded-4xl">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">
        Crear cuenta
      </h2>
      <p className="text-sm sm:text-base text-white mb-6 text-center">
        Regístrate para acceder a ventas y dashboard
      </p>

      <div className="mb-4">
        <label className="font-semibold text-sm text-white pb-1 block">
          Nombre
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:px-2 focus:outline-none  caret-white focus:placeholder-transparent focus:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="font-semibold text-sm text-white pb-1 block">
          Correo
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:px-2 focus:outline-none  caret-white focus:placeholder-transparent focus:text-white"
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
          className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:px-2 focus:outline-none  caret-white focus:placeholder-transparent focus:text-white"
          required
          minLength={4}
        />
      </div>

      {error && (
        <p className="text-sm text-red-400 mb-3" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="py-2 px-4 bg-white hover:scale-[1.05] text-gray-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md cursor-pointer rounded-xl"
      >
        Registrarse
      </button>

      <div className="mt-4 text-center">
        <span className="text-white text-sm">¿Ya tienes cuenta?</span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-sm text-white hover:scale-[1.05] uppercase tracking-wide transition block w-full mt-2"
        >
          Iniciar sesión
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
