import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function DashboardHeader({ title = "Dashboard", subtitle, backTo = "/ventas" }) {
  const { logout } = useAuth();

  return (
    <header className="mb-8 flex items-center justify-between flex-wrap gap-2">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-200">{title}</h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-gray-300 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Link
          to={backTo}
          className="text-sm text-gray-400 hover:text-gray-200 uppercase tracking-wide transition"
        >
          ← Volver a ventas
        </Link>
        <button
          type="button"
          onClick={logout}
          className="text-sm text-gray-400 hover:text-gray-200 uppercase tracking-wide transition"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;
