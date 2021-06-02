import * as yup from "yup";

export const FormValidations = yup.object().shape({
	name: yup.string().required("Nome é obrigatório"),
	email: yup
		.string()
		.email("Formato de e-mail inválido!")
		.required("E-mail é obrigatório"),
	lastName: yup.string().min(8, "Minimum 8 chars").max(20, "Max 20 chars"),
});
