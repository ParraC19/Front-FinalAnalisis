import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthView = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <section className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="relative min-h-[480px] w-[768px] max-w-full overflow-hidden rounded-[30px] bg-white shadow-[0_5px_15px_rgba(0,0,0,0.35)] transition-all duration-700 ease-in-out">
        <div
          className={`absolute top-0 left-0 h-full w-1/2 flex items-center justify-center flex-col px-10 transition-all duration-700 ease-in-out ${
            isRegistering
              ? "translate-x-full opacity-100 z-[5]"
              : "opacity-0 z-[1]"
          }`}
        >
          <RegisterForm />
        </div>

        <div
          className={`absolute top-0 left-0 h-full w-1/2 flex items-center justify-center flex-col px-10 transition-all duration-700 ease-in-out ${
            isRegistering ? "translate-x-full" : "z-[2]"
          }`}
        >
          <LoginForm />
        </div>

        <div
          className={`absolute top-0 left-1/2 h-full w-1/2 overflow-hidden z-[1000] transition-all duration-700 ease-in-out ${
            isRegistering
              ? "-translate-x-full rounded-[0_150px_100px_0]"
              : "rounded-[150px_0_0_100px]"
          }`}
        >
          <div
            className={`relative left-[-100%] h-full w-[200%] bg-gradient-to-r from-[#fafafa] to-[#8b8b8b] text-gray-800 transition-all duration-700 ease-in-out ${
              isRegistering ? "translate-x-1/2" : ""
            }`}
          >
            <div
              className={`absolute top-0 left-0 flex h-full w-1/2 flex-col items-center justify-center px-8 text-center transition-all duration-700 ease-in-out ${
                isRegistering ? "translate-x-0" : "-translate-x-[200%]"
              }`}
            >
              <h1 className="text-3xl font-bold">Bienvenido de nuevo!</h1>
              <p className="my-5">
                Ingresa tus datos personales para utilizar todas las funciones
                del sitio.
              </p>
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className="mt-4 rounded-lg bg-[#353535] px-12 py-2 uppercase tracking-wider text-white hover:opacity-90"
              >
                Iniciar sesion
              </button>
            </div>

            <div
              className={`absolute top-0 right-0 flex h-full w-1/2 flex-col items-center justify-center px-8 text-center transition-all duration-700 ease-in-out ${
                isRegistering ? "translate-x-[200%]" : ""
              }`}
            >
              <h1 className="text-3xl font-bold">Hola, Amigo!</h1>
              <p className="my-5">
                Registrate con tus datos personales para utilizar todas las
                funciones del sitio.
              </p>
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="mt-4 rounded-lg bg-[#353535] px-12 py-2 uppercase tracking-wider text-white hover:opacity-90"
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthView;
