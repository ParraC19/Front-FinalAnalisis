import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ActualDate from "./ActualDate";

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full h-[10%] border-b border-gray-600 bg-gray-500 backdrop-blur-sm shadow-md  "> 
      <div className="relative mx-1 flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="z-10 flex shrink-0 items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-white transition hover:text-white"
          >
            <img
              src="/vite.svg"
              alt="Logo"
              className="h-9 w-9 sm:h-10 sm:w-10"
            />
            <span className="hidden font-semibold tracking-tight sm:inline text-sm sm:text-base bungee-regular">
              METRICSALES
            </span>
          </Link>
        </div>

        <nav
          className="absolute left-1/2 top-1/2 z-10 flex max-w-[min(55vw,20rem)] -translate-x-1/2 -translate-y-1/2 flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:max-w-none sm:gap-8 md:gap-10"
          aria-label="Principal"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md text-white hover:bg-gray-200 hover:text-black px-3 py-2 text-xs font-semibold transition ease-in duration-200 hover:scale-[1.02] sm:px-5 sm:text-sm md:text-base"
          >
            Inicio
          </Link>
          <Link
            to="/ventas"
            className="inline-flex items-center justify-center rounded-md text-white hover:bg-gray-200 hover:text-black px-3 py-2 text-xs font-semibold transition ease-in duration-200 hover:scale-[1.02] sm:px-5 sm:text-sm md:text-base"
          >
            Ventas
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-md text-white hover:bg-gray-200 hover:text-black px-3 py-2 text-xs font-semibold transition ease-in duration-200 hover:scale-[1.02] sm:px-5 sm:text-sm md:text-base"
          >
            Dashboard
          </Link>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center justify-center rounded-md text-white hover:bg-gray-200 hover:text-black px-3 py-2 text-xs font-semibold transition ease-in duration-200 hover:scale-[1.02] sm:px-5 sm:text-sm md:text-base"
            >
              Cerrar sesion
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-md text-white hover:bg-gray-200 hover:text-black px-3 py-2 text-xs font-semibold transition ease-in duration-200 hover:scale-[1.02] sm:px-5 sm:text-sm md:text-base"
            >
              Iniciar sesion
            </Link>
          )}
        </nav>

        <div className="z-10 flex shrink-0 items-center justify-end">
          <ActualDate />
        </div>
      </div>
    </header>
  );
}

export default Header;