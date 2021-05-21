// packages
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
// visuals
import logo from "assets/svg/logo.svg"
import style from "./style.module.scss";



const Header = () => {
    return (
        <Router>
            <header className={style.header}>
                <img src={logo} className="App-logo" alt="logo" />
                <div>
                <h3>Guilda front-end - Testes unitários</h3>
                <div className={style.header_menu}>
                    <ul className={style.menu}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/users">Usuários</Link></li>
                    </ul>
                </div>
                </div>
            </header>
        </Router>
    )
}

export default Header;
