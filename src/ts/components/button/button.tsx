
import styles from "./style.module.scss";

interface IProps {
	hasErrors: boolean;
	children: string;
}

const Button: React.FC<IProps> = ({ hasErrors, children,...rest }: IProps) => {
	return (
		<button
			{...rest}
			type="submit"
			className={hasErrors ? `${styles.disabled}` : ""}
			disabled={hasErrors}
			>
				{children}
		</button>
	)
}

export default Button;
