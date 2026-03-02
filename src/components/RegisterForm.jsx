const RegisterForm = () => {
  return (
    <form className="flex h-full w-full flex-col items-center justify-center bg-white px-10">
      <h1 className="mb-4 text-3xl font-bold">Crear Cuenta</h1>
      <input
        type="text"
        placeholder="Nombre"
        className="mb-2 w-full rounded-lg bg-gray-200 px-4 py-2 outline-none"
      />
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
      <button
        type="submit"
        className="mt-4 rounded-lg bg-[#353535] px-12 py-2 uppercase tracking-wider text-white hover:opacity-90"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
