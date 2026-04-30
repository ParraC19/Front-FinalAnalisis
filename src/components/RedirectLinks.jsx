import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

function RedirectLinks() {
    const { logout } = useAuth();
  return (
    <div className="flex items-center justify-around gap-4">
        <Link to="/" className="text-md text-gray-900 hover:text-gray-700 uppercase tracking-wide transition cursor-pointer">
          ← Volver a Inicio
        </Link>
        <Link to="/dashboard" className="text-md text-gray-900 hover:text-gray-700 uppercase tracking-wide transition cursor-pointer">
          Ir al Dashboard
        </Link>
        <button
          type="button"
          onClick={logout}
          className="text-md text-gray-900 hover:text-gray-700 uppercase tracking-wide transition cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
  )
}

export default RedirectLinks