import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <img 
              src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755557481/Logo_ytl7br.png" 
              alt="Logo" 
              className="h-12 md:h-14 transition-all duration-300"
            />
          </NavLink>

          {/* Botón Hamburguesa*/}
          <button
            className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            <svg
              className="w-7 h-7 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

          {/* Menú  - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <ul className="flex space-x-6">
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

        {/* Menú - Mobile */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}>
            <div className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300">
              <div className="p-6">
                {/* Logo en móvil */}
                <div className="mb-8">
                  <img 
                    src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755557481/Logo_ytl7br.png" 
                    alt="Logo" 
                    className="h-12 mx-auto"
                  />
                </div>

                {/* Menú móvil */}
                <ul className="space-y-4">
                  <MobileNavItem to="/" exact onClick={() => setIsOpen(false)}>
                    Inicio
                  </MobileNavItem>
                  <MobileNavItem to="/evaluaciones" onClick={() => setIsOpen(false)}>
                    Evaluaciones
                  </MobileNavItem>
                  <MobileNavItem to="/catalogo-instituciones" onClick={() => setIsOpen(false)}>
                    Instituciones
                  </MobileNavItem>
                  <MobileNavItem to="/acerca-de" onClick={() => setIsOpen(false)}>
                    Acerca
                  </MobileNavItem>
                  <MobileNavItem to="/contacto" onClick={() => setIsOpen(false)}>
                    Contacto
                  </MobileNavItem>
                </ul>

                {/* Cerrar*/}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
                  aria-label="Cerrar menú"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavItem({ to, children, exact = false }) {
  return (
    <li>
      <NavLink
        to={to}
        exact={exact}
        className={({ isActive }) =>
          `px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
            isActive 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

function MobileNavItem({ to, children, exact = false, onClick }) {
  return (
    <li>
      <NavLink
        to={to}
        exact={exact}
        onClick={onClick}
        className={({ isActive }) =>
          `block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200 ${
            isActive 
              ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}