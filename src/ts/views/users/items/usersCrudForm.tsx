import React, { useCallback, useState } from 'react';
import Input from 'ts/components/input/input';
import { FormValidations } from "ts/utils/validation"

import styles from "../../../../style.module.scss";
import useValidation from 'ts/hooks/useValidation';

interface IProps {
	handleSubmitForm: any;
}

const initialState = {
	name: "",
	lastName: "",
	email: ""
}

const UsersCrudForm = ({ handleSubmitForm }:IProps) => {
	const [form, setForm] = useState(initialState);
	const { errors, hasErrors } = useValidation(form, FormValidations) as any

	const setInput = useCallback((newValue: any) =>
		setForm((value: any) => ({...value, ...newValue}))
	, [setForm]);

	return (
	<>
		<h3>Cadastro de usuário</h3>
		<form onSubmit={(event) => {
			event.preventDefault();
			handleSubmitForm(form);
			setForm(initialState);
		}}>
			<div className="form-group">
				<Input
					value={form.name}
					placeholder="Nome"
					name="name"
					onChange={(e: any) => setInput({ name: e.target.value })}
					label="Nome"
					error={errors.name}
				/>
				<Input
					placeholder="Sobrenome"
					value={form.lastName}
					name="lastName"
					onChange={(e: any) => setInput({ lastName: e.target.value })}
					label="Sobrenome"
					error={errors.lastName}
				/>
				<Input
					placeholder="E-mail"
					value={form.email}
					name="email"
					onChange={(e: any) => setInput({ email: e.target.value })}
					label="E-mail"
					error={errors.email}
				/>
			</div>

			<div className={styles.center}>
				<button
					type="submit"
					className={hasErrors && `${styles.disabled}`}
					disabled={hasErrors}>Salvar</button>
			</div>
		</form>
	</>
  )
}

export default UsersCrudForm;
