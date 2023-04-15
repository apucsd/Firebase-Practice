import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="bg-slate-50">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
