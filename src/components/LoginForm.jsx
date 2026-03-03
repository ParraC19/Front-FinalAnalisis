const LoginForm = () => {
  return (
    <form className="flex h-full w-full flex-col items-center justify-center bg-white px-10">
      <h1 className="mb-4 text-3xl font-bold">Iniciar sesion</h1>
      <input
        type="email"
        placeholder="Correo"
        className="mb-2 w-full rounded-lg bg-gray-200 px-4 py-2 outline-none"
      />
      <input
        type="password"
        placeholder="Contrasena"
        className="mb-2 w-full rounded-lg bg-gray-200 px-4 py-2 outline-none"
      />
      <a href="#" className="mb-3 text-sm text-gray-700">
        Olvidaste tu contrasena?
      </a>
      <button
        type="submit"
        className="mt-4 rounded-lg bg-[#353535] px-12 py-2 uppercase tracking-wider text-white hover:opacity-90"
      >
        Iniciar sesion
      </button>
    </form>
  );
};

export default LoginForm;
