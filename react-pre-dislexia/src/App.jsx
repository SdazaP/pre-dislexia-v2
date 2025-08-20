import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Evaluaciones from "./Pages/Evaluaciones";
import Acerca from "./Pages/Acerca";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/evaluaciones" element={<Evaluaciones/>}></Route>
        <Route exact path="/acerca-de" element={<Acerca/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
