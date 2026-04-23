import { useState } from "react";
import { register } from "../api/services/auth";

const TIENDAS = [
  "AMERICANINO",
  "CHEVIGNON",
  "RIFLE",
  "NAF_NAF",
  "ESPRIT",
  "AMERICAN_EAGLE",
  "MANGO",
  "CARRERA",
];

const inputClass =
  "border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:outline-none caret-white focus:placeholder-transparent focus:text-white";
const labelClass = "font-semibold text-sm text-white pb-1 block";

function RegisterForm({ onSwitchToLogin }) {
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    documento: "",
    // Vendedor
    tienda: "",
    // Supervisor
    tiendasACargo: [],
    // Comunes
    fechaDeNacimiento: "",
    salarioBase: "",
    fechaIngreso: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleTienda = (tienda) => {
    setForm((prev) => {
      const already = prev.tiendasACargo.includes(tienda);
      return {
        ...prev,
        tiendasACargo: already
          ? prev.tiendasACargo.filter((t) => t !== tienda)
          : [...prev.tiendasACargo, tienda],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Selecciona un rol.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (role === "SUPERVISOR" && form.tiendasACargo.length === 0) {
      setError("Selecciona al menos una tienda a cargo.");
      return;
    }

    setLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role,
      ...(role === "VENDEDOR"
        ? {
            sellerInfo: {
              documento: form.documento,
              tienda: form.tienda,
              fechaDeNacimiento: form.fechaDeNacimiento,
              salarioBase: parseFloat(form.salarioBase),
              fechaIngreso: form.fechaIngreso,
            },
          }
        : {
            supervisorInfo: {
              documento: form.documento,
              tiendasACargo: form.tiendasACargo,
              fechaDeNacimiento: form.fechaDeNacimiento,
              salarioBase: parseFloat(form.salarioBase),
              fechaIngreso: form.fechaIngreso,
            },
          }),
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
          Cuenta creada. Tu código se generó automáticamente. Redirigiendo...
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
        Completa tus datos para registrarte
      </p>

      {/* Rol */}
      <div className="mb-4">
        <label className={labelClass}>Rol</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className={inputClass}
        >
          <option value="" className="text-gray-600 bg-gray-700">
            Selecciona tu rol
          </option>
          <option value="VENDEDOR" className="text-gray-200 bg-gray-700">
            Vendedor
          </option>
          <option value="SUPERVISOR" className="text-gray-200 bg-gray-700">
            Supervisor
          </option>
        </select>
      </div>

      {/* Datos básicos */}
      {[
        { label: "Nombre completo", name: "name", type: "text" },
        { label: "Correo", name: "email", type: "email" },
        { label: "Contraseña", name: "password", type: "password", min: 6 },
        { label: "Confirmar contraseña", name: "confirmPassword", type: "password", min: 6 },
        { label: "Documento", name: "documento", type: "text" },
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

      {/* Campos según rol */}
      {role === "VENDEDOR" && (
        <div className="mb-4">
          <label className={labelClass}>Tienda</label>
          <select
            name="tienda"
            value={form.tienda}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="" className="text-gray-600 bg-gray-700">
              Selecciona una tienda
            </option>
            {TIENDAS.map((t) => (
              <option key={t} value={t} className="text-gray-200 bg-gray-700">
                {t.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      )}

      {role === "SUPERVISOR" && (
        <div className="mb-4">
          <label className={labelClass}>Tiendas a cargo</label>
          <div className="mt-2 grid grid-cols-2 gap-1">
            {TIENDAS.map((t) => (
              <label
                key={t}
                className="flex items-center gap-2 text-sm text-white cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={form.tiendasACargo.includes(t)}
                  onChange={() => toggleTienda(t)}
                  className="accent-white"
                />
                {t.replace(/_/g, " ")}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Campos comunes con info */}
      {role && (
        <>
          <div className="mb-4">
            <label className={labelClass}>Salario base</label>
            <input
              type="number"
              name="salarioBase"
              value={form.salarioBase}
              onChange={handleChange}
              className={inputClass}
              required
              min="1"
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label className={labelClass}>Fecha de nacimiento</label>
            <input
              type="date"
              name="fechaDeNacimiento"
              value={form.fechaDeNacimiento}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div className="mb-4">
            <label className={labelClass}>Fecha de ingreso</label>
            <input
              type="date"
              name="fechaIngreso"
              value={form.fechaIngreso}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <p className="text-xs text-gray-300 mb-4 text-center">
            Tu código de {role === "VENDEDOR" ? "vendedor" : "supervisor"} se
            generará automáticamente al registrarte.
          </p>
        </>
      )}

      {error && (
        <p className="text-sm text-red-400 mb-3" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !role}
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
