import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';

import Home from "./Pages/Home";
import Evaluaciones from "./Pages/Evaluaciones";
import Acerca from "./Pages/Acerca";
import ArticuloDislexia from "./Pages/ArticuloDislexia";
import Contacto from "./Pages/Contacto";
import CatalogoInstituciones from "./Pages/Instituciones";
import PreInicio from "./Pages/Pruebas/PreInicio";
import Registro from "./Pages/Pruebas/Registro";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/evaluaciones" element={<Evaluaciones/>}></Route>
        <Route exact path="/acerca-de" element={<Acerca/>}></Route>
        <Route exact path="/articulo" element={<ArticuloDislexia/>}></Route>
        <Route exact path="/contacto" element={<Contacto/>}></Route>
        <Route exact path="/catalogo-instituciones" element={<CatalogoInstituciones/>}></Route>
        <Route exact path="/evaluacion/registro" element={<Registro/>}></Route>
        <Route path="/evaluacion/pre-inicio" element={<PreInicio/>} />
      </Routes>
    </Router>
  );
}

export default App;
