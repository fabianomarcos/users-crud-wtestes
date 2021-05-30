import React, { useEffect } from 'react';
import Input from 'ts/components/input/input';
import { FormValidations } from "ts/utils/validation"

import styles from "src/style.module.scss";
import useValidation from 'ts/hooks/useValidation';

interface IProps {
	handleSubmitForm: any;
	setForm: any;
	form: any;
}

const UsersCrudForm = ({ handleSubmitForm, setForm, form }:IProps) => {
	const { errors, hasErrors } = useValidation(form, FormValidations) as any
	const setInput = (newValue: any) => setForm((value: any) => ({...value, ...newValue}));

	useEffect(() => {
		setForm({});
		setInput({ name: "", lastName: "", email: "" })
	}, []);

	return (
	<>
		<h3>Cadastro de usuário</h3>
		<form onSubmit={handleSubmitForm}>
			<div className="form-group">
				<Input
					value={form.name}
					name="name"
					onChange={(e: any) => setInput({ name: e.target.value })}
					label="Nome"
					error={errors.name}
				/>
				<Input
					value={form.lastName}
					name="lastName"
					onChange={(e: any) => setInput({ lastName: e.target.value })}
					label="Sobrenome"
					error={errors.lastName}
				/>
				<Input
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
