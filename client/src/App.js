import React, { useEffect } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/nav-bar";
import ContactState from "./context/contact/contactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alerts/AlertState";
import Alert from "./components/alerts";

function App() {
  useEffect(() => {}, []);
  return (
    <>
      <AuthState>
        <ContactState>
          <AlertState>
            <Router>
              <Navbar />
              <Alert />
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                {/* <h1>Welcome to Ezos Family Contact </h1> */}
              </Switch>
            </Router>
          </AlertState>
        </ContactState>
      </AuthState>
    </>
  );
}

export default App;
