import React, { useState } from "react";
import styles from "./style.module.scss"

const Input = ({ error, label, ...rest }: any) => {
  const [touched, setTouched] = useState(false);

  return (
    <>
		<label htmlFor={rest.name}>{label}</label>
		<input className="form-control" {...rest} onBlur={() => setTouched(!touched)} />
		<span className={styles.text_danger}>{touched && error}</span>
    </>
  )
}

export default Input;


