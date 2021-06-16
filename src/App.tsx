import React from "react";
// packages
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// styles
import "assets/sass/index.scss";
import style from "./style.module.scss";
// visuals
import logo from "assets/svg/logo.svg";
// pages
import Users from "ts/views/users";
import LandingPage from "ts/views/landingPage";

const App = () => {
	return (
		<Router>
			<header className={style.header}>
				<img src={logo} className="App-logo" alt="logo" />
				<div>
					<h3>Guilda front-end - Testes unitários</h3>
					<div className={style.header_menu}>
						<ul className={style.menu}>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/users">Usuários</Link>
							</li>
						</ul>
					</div>
				</div>
			</header>
			<Switch>
				<Route path="/users">
					<Users />
				</Route>
				<Route path="/">
					<LandingPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
