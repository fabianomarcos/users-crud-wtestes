// packages
import React from "react";
// styles
import styles from "./style.module.scss";

const Modal = ({ handleClose, show, children }: any) => {
	const showHideClassName = show
		? `${styles.modal} ${styles.display_block}`
		: `${styles.modal} ${styles.display_none}`;

	return (
		<div className={showHideClassName}>
			<div className={styles.modal_main}>
				<div className={styles.close_button}>
					<button
						type="button"
						className={styles.close_button}
						onClick={handleClose}
					>
						X
					</button>
				</div>

				<main>{children}</main>
			</div>
		</div>
	);
};

export default Modal;
