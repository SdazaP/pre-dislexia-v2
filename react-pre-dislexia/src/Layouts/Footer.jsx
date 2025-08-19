import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-blue-400 sm:bg-white text-white sm:text-gray-700 py-8 text-lg">
      <div className="container mx-auto px-4">
        {/* Footer Head */}
        <div className="flex flex-col md:flex-row items-center justify-center sm:gap-30 mb-8">
          <div className="mb-6 md:mb-0">
            <img 
              src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755557481/Logo_ytl7br.png" 
              alt="Logo" 
              className="h-48 mx-auto md:mx-0" 
            />
          </div>
          <div className="text-center md:max-w-lg">
            <h1 className="text-4xl font-bold">
              Pre-Diagnóstico de Dislexia en niños de 1ro y 2do grado de primaria
            </h1>
          </div>
        </div>

        {/* Footer Center */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 sm:gap-32 mb-8">
          <div className="lg:w-1/2">
            <h4 className="text-lg font-medium mb-4">Nuestra Misión</h4>
            <p className="text-justify">
              Brindar un diagnóstico temprano y preciso de dislexia en niños, permitiendo una intervención oportuna que facilite su proceso de aprendizaje y mejore su calidad de vida.
            </p>
          </div>

          <div className="lg:w-1/2 lg:text-left">
            <ul className="grid grid-cols-1 gap-4">
              <FooterLink to="/">Inicio</FooterLink>
              <FooterLink to="/evaluaciones">Evaluaciones</FooterLink>
              <FooterLink to="/acerca-de">Acerca de</FooterLink>
              <FooterLink to="/contacto">Contacto</FooterLink>
              <FooterLink to="/catalogo-instituciones">Catálogo de Instituciones</FooterLink>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Footer End */}
        <div className="text-center text-sm text-white">
          <p>
            Desarrollado por Aguilar J., Daza S. y González E. <br />
            I.T.S de Tepexi de Rodríguez
          </p>
        </div>
      </div>
    </footer>
  );
}

// Componente auxiliar para los enlaces del footer
function FooterLink({ to, children }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `hover:text-blue-600 transition-colors ${
            isActive ? 'text-black sm:text-blue-600 font-medium' : 'sm:text-gray-40'
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}