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
import PalabraImagen from "./Pages/Pruebas/PalabraImagen";
import CompletaPalabra from "./Pages/Pruebas/CompletaPalabra";
import PatronFiguras from "./Pages/Pruebas/PatronFiguras";
import CuestionarioPadres from "./Pages/Pruebas/CuestionarioPadres";
import ReporteDiagnostico from "./Pages/Pruebas/Reporte/ReporteDiagnostico";

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

        <Route path="/evaluacion/palabra-imagen" element={<PalabraImagen/>} />
        <Route path="/evaluacion/completa-palabra" element={<CompletaPalabra/>} />
        <Route path="/evaluacion/patron-figuras" element={<PatronFiguras/>} />
        <Route path="/evaluacion/cuestionario-padres" element={<CuestionarioPadres/>} />

        <Route path="/evaluacion/reporte" element={<ReporteDiagnostico/>} />
      </Routes>
    </Router>
  );
}

export default App;
