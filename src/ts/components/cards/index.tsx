// packages
import React from "react";

// interface
import propsInterface from "./types";

const Cards = (props: propsInterface) => {
    const { title, description, action, img } = props;
    <div>
        <div className="">
            <img src={img} alt="" />
        </div>
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
        <div>
            <span>Conheçer melhor ?</span>
            <button onClick={() => action()}>LinkedIn</button>
        </div>
    </div>
}

export default Cards;
