import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Evaluaciones from "./Pages/Evaluaciones";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/evaluaciones" element={<Evaluaciones/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
