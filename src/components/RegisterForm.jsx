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

function RegisterForm({ onSwitchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    vendorCode: "",
    documento: "",
    tienda: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: "VENDEDOR",
      vendorCode: form.vendorCode,
      sellerInfo: {
        documento: form.documento,
        tienda: form.tienda,
        fechaDeNacimiento: form.fechaDeNacimiento,
        salarioBase: parseFloat(form.salarioBase),
        fechaIngreso: form.fechaIngreso,
      },
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
          Cuenta creada. Redirigiendo a iniciar sesión...
        </p>
      </div>
    );
  }

  const inputClass =
    "border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:outline-none caret-white focus:placeholder-transparent focus:text-white";
  const labelClass = "font-semibold text-sm text-white pb-1 block";

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
        { label: "Contraseña", name: "password", type: "password" },
        { label: "Código de vendedor", name: "vendorCode", type: "text" },
        { label: "Documento", name: "documento", type: "text" },
      ].map(({ label, name, type }) => (
        <div className="mb-4" key={name}>
          <label className={labelClass}>{label}</label>
          <input
            type={type}
            name={name}
            value={form[name]}
            onChange={handleChange}
            className={inputClass}
            required
            minLength={name === "password" ? 6 : undefined}
          />
        </div>
      ))}

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
            Seleccione una tienda
          </option>
          {TIENDAS.map((t) => (
            <option key={t} value={t} className="text-gray-200 bg-gray-700">
              {t.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

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
