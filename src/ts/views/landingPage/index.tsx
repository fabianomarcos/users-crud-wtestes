// packages
import React from 'react';

// parts
import StellaPic from "../../../assets/images/stella.png";
import IgorPic from "../../../assets/images/Igor.jpg";
import FabianoPic from "../../../assets/images/Fabiano.jpg";
import Cards from "ts/components/cards";

const App = () => {
  return (
    <div className="container">
      <main>
        <h1 className="pageTitle">Home</h1>
        <div className=" flex">
          <Cards img={StellaPic} title="Stella Resende" description="Ex-docente e desenvolvedora Front-end" action={() => {}}/>
          <Cards img={IgorPic} title="Igor Lúcio" description="Desenvolvedor Front-end" action={() => {}}/>
          <Cards img={FabianoPic} title="Fabiano Marco" description="Desenvolvedor Front-end" action={() => {}}/>
        </div>
      </main>
    </div>
  );
}

export default App;
