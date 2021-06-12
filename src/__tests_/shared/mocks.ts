export const mockedErrors = {email: "E-mail é obrigatório", lastName: "Minimum 8 chars", name: "Nome é obrigatório"}

export const mockedFunction = jest.fn();
export const mockedFunctionTwo = jest.fn();
export const mockedFunctionThree = jest.fn();

export const inputWithValues = { name: "Meu Primeiro Nome", lastName: "Meu Segundo Nome", email: "email@gmail.com"}

export const mocks = {
	mockedFunction,
	inputWithValues,
	mockedErrors,
}
