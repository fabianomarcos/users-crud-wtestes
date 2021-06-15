// packages
import React from "react";

// parts
import StellaPic from "../../../assets/images/stella.png";
import IgorPic from "../../../assets/images/Igor.jpg";
import FabianoPic from "../../../assets/images/Fabiano.jpg";

// components
import Cards from "ts/components/cards";

// utils
import guildaHosts from "./utils";

const App = () => {
	return (
		<div className="container">
			<main>
				<div className="pageHeader">
					<h1 className="pageTitle">Home</h1>
				</div>
				<div className="flex">
					<Cards
						img={StellaPic}
						title={guildaHosts.Stela.name}
						description={guildaHosts.Stela.description}
						link={guildaHosts.Stela.linkedin}
					/>
					<Cards
						img={IgorPic}
						title={guildaHosts.Igor.name}
						description={guildaHosts.Igor.description}
						link={guildaHosts.Igor.linkedin}
					/>
					<Cards
						img={FabianoPic}
						title={guildaHosts.Fabiano.name}
						description={guildaHosts.Fabiano.description}
						link={guildaHosts.Fabiano.linkedin}
					/>
				</div>
			</main>
		</div>
	);
};

export default App;
