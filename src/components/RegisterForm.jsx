import { useState } from "react";
import { register } from "../api/services/auth";

const inputClass =
  "border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:outline-none caret-white focus:placeholder-transparent focus:text-white";
const labelClass = "font-semibold text-sm text-white pb-1 block";

function RegisterForm({ onSwitchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: "VENDEDOR",
    };

    try {
      await register(payload);
      setSuccess(true);
      setTimeout(() => onSwitchToLogin?.(), 1500);
    } catch (err) {
      setError(err.message || "No se pudo crear la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-sm text-center">
        <p className="text-sm sm:text-base text-green-400">
          Cuenta creada. Tu código de vendedor se generó automáticamente. Redirigiendo...
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-gray-500 p-8 rounded-4xl overflow-y-auto max-h-[90vh]"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">
        Crear cuenta
      </h2>
      <p className="text-sm sm:text-base text-white mb-6 text-center">
        Completa tus datos para registrarte como vendedor
      </p>

      {[
        { label: "Nombre completo", name: "name", type: "text" },
        { label: "Correo", name: "email", type: "email" },
        { label: "Contraseña", name: "password", type: "password", min: 6 },
        { label: "Confirmar contraseña", name: "confirmPassword", type: "password", min: 6 },
      ].map(({ label, name, type, min }) => (
        <div className="mb-4" key={name}>
          <label className={labelClass}>{label}</label>
          <input
            type={type}
            name={name}
            value={form[name]}
            onChange={handleChange}
            className={inputClass}
            required
            minLength={min}
          />
        </div>
      ))}

      <p className="text-xs text-gray-300 mb-4 text-center">
        Tu código de vendedor se generará automáticamente al registrarte.
      </p>

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
        {loading ? "Registrando..." : "Registrarse"}
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
