import { useState } from "react";

function ForgotPasswordForm({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center">
        <p className="text-sm sm:text-base text-gray-300 mb-4">
          Si existe una cuenta con ese correo, recibirás instrucciones para
          restablecer tu contraseña.
        </p>
        <button
          type="button"
          onClick={onBackToLogin}
          className="py-2 px-4 bg-gray-200 hover:scale-[1.02] text-gray-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md cursor-pointer rounded"
        >
          Volver a iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm bg-gray-500 p-8 rounded-4xl ">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">
        Restablecer contraseña
      </h2>
      <p className="text-sm sm:text-base text-white mb-6 text-center">
        Ingresa tu correo y te enviaremos un enlace para restablecer tu
        contraseña.
      </p>
      <div className="mb-4">
        <label className="font-semibold text-sm text-white pb-1 block mb-2">
          Correo electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-x-2 border-b-2 rounded-4xl border-white py-2 px-2 mt-1 w-full text-sm text-white bg-transparent focus:border-gray-200 focus:px-2 focus:outline-none  caret-white focus:placeholder-transparent focus:text-white mb-2"
          required
        />
      </div>
      <button
        type="submit"
        className="py-2 px-4 bg-white hover:scale-[1.05] text-gray-800 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md cursor-pointer rounded-xl"
      >
        Enviar instrucciones
      </button>
      <button
        type="button"
        onClick={onBackToLogin}
        className="text-sm text-white hover:scale-[1.05] uppercase tracking-wide transition block w-full mt-6"
      >
        ← Volver a iniciar sesión
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
