// packages
import React from "react";
// styles
import style from "./style.module.scss";

// interface
import propsInterface from "./types";

const Cards = (props: propsInterface) => {
	const { title, description, link, img } = props;
	return (
		<div className={style.card}>
			<img src={img} className={style.card_img_top} alt="..." />
			<div className={style.card_body}>
				<h5 className={style.card_title}>{title}</h5>
				<p className={style.card_text}>{description}</p>
				<div className={style.card_footer}>
					<a className="btn btn-primary" href={link}>
						LinkedIn
					</a>
				</div>
			</div>
		</div>
	);
};

export default Cards;
