import "./App.scss";
import HomePage from "./pages/homePage";
import LogInPage from "./pages/logInPage";
import * as React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Link to="/">login</Link>
      <Link to="/home">home</Link>
    </div>
  );
}

export default App;
