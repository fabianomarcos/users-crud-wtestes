import { screen, fireEvent } from "@testing-library/react";

interface ISetInputs {
	inputName?: () => HTMLInputElement;
	inputLastName?: () => HTMLInputElement;
	inputEmail?: () => HTMLInputElement;
}

export const getElements = {
	inputName: () => screen.getByPlaceholderText("Nome") as HTMLInputElement || "",
	inputLastName: () => screen.getByPlaceholderText("Sobrenome") as HTMLInputElement || "",
	inputEmail: () => screen.getByPlaceholderText("E-mail") as HTMLInputElement || "",
};

export const setValueInInput = ({
	inputName,
	inputLastName,
	inputEmail
}: ISetInputs) => {
	inputName && fireEvent.change(inputName(), { target: { value: "Meu Primeiro Nome" } });
	inputLastName && fireEvent.change(inputLastName(), { target: { value: "Meu Segundo Nome"} });
	inputEmail && fireEvent.change(inputEmail(), { target: { value: "email@gmail.com"} });
}
