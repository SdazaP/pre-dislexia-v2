import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <img 
              src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755557481/Logo_ytl7br.png" 
              alt="Logo" 
              className="h-15"
            />
          </NavLink>

          {/* Botón Hamburguesa (mobile) */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Menú de navegación */}
          <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:justify-center w-full md:w-auto`}>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 py-4 md:py-0">
              <NavItem to="/" exact>
                Inicio
              </NavItem>
              <NavItem to="/evaluaciones">
                Evaluaciones
              </NavItem>
              <NavItem to="/catalogo-instituciones">
                Instituciones
              </NavItem>
              <NavItem to="/acerca-de">
                Acerca
              </NavItem>
              <NavItem to="/contacto">
                Contacto
              </NavItem>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Componente auxiliar para los items del menú
function NavItem({ to, children, exact = false }) {
  return (
    <li>
      <NavLink
        to={to}
        exact={exact}
        className={({ isActive }) =>
          `block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 ${
            isActive ? 'text-blue-600 font-medium' : ''
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}