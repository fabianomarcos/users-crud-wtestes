import { render, screen, fireEvent, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

// parts
import Form from "ts/views/users/items/usersCrudForm";
import Input from "ts/components/input/input";
import Button from "ts/components/button/button";
import useValidation from "ts/hooks/useValidation";
import { FormValidations } from "ts/utils/validation"

// shared
import { setValueInInput, getElements } from "./shared/utils";
import { mockedErrors, inputWithValues, mocks, mockedFunctionTwo, mockedFunctionThree, mockedFunction } from "./shared/mocks";

afterEach(() => {
	jest.resetAllMocks();
});

describe("Crud form users", () => {
	it("Should be able to render all form components", () => {
		render(<Form handleSubmitForm={mockedFunction} />)

		expect(screen.getByText("Nome")).toBeTruthy()
		expect(screen.getByText("Sobrenome")).toBeTruthy()
		expect(screen.getByText("E-mail")).toBeTruthy()

		/* expect(await screen.findByText("Nome")).toBeTruthy()
		expect(await screen.findByText("Sobrenome")).toBeTruthy()
		expect(await screen.findByText("E-mail")).toBeTruthy() */

		expect(screen.getByPlaceholderText("Nome")).toBeTruthy()
		expect(screen.getByPlaceholderText("Sobrenome")).toBeTruthy()
		expect(screen.getByPlaceholderText("E-mail")).toBeTruthy()

		expect(screen.getByRole('button', { name: /salvar/i })).toBeTruthy()
	});

	it("Should be able render Input with error messages", () => {
		const errors = {
			name: "Nome obrigatório",
			lastName: "Sobrenome obrigatório",
			email: "Email obrigatório"
		}

		const input_name = <Input
			value="name"
			placeholder="Nome"
			touch={true}
			name="name"
			onChange={mockedFunction}
			label="Nome"
			error={errors.name}
		/>

		const input_last_name = <Input
			value="Last Name"
			placeholder="Sobrenome"
			touch={true}
			name="LastName"
			onChange={mockedFunctionTwo}
			label="Sobrenome"
			error={errors.lastName}
		/>

		const input_email = <Input
			value="email"
			placeholder="E-mail"
			touch={true}
			name="email"
			onChange={mockedFunctionThree}
			label="Email"
			error={errors.email}
		/>
		render(input_name)
		render(input_last_name)
		render(input_email)

		const inputName = screen.getByPlaceholderText("Nome")
		expect(inputName).toBeTruthy()
		expect(screen.getByText(errors.name)).toBeTruthy()

		const inputLastName = screen.getByPlaceholderText("Sobrenome")
		expect(inputLastName).toBeTruthy()
		expect(screen.getByText(errors.name)).toBeTruthy()

		const inputEmail = screen.getByPlaceholderText("E-mail")
		expect(inputEmail).toBeTruthy()
		expect(screen.getByText(errors.email)).toBeTruthy()
	});

	it("Should be able render Input with error messages improvement", () => {
		const input_name = <Input
			value="name"
			placeholder="Nome"
			touch={true}
			name="name"
			onChange={mockedFunction}
			label="Nome"
			error={mocks.mockedErrors.name}
		/>

		const input_last_name = <Input
			value="Last Name"
			placeholder="Sobrenome"
			touch={true}
			name="LastName"
			onChange={mockedFunctionTwo}
			label="Sobrenome"
			error={mocks.mockedErrors.lastName}
		/>

		const input_email = <Input
			value="email"
			placeholder="E-mail"
			touch={true}
			name="email"
			onChange={mockedFunctionThree}
			label="Email"
			error={mocks.mockedErrors.email}
		/>
		render(input_name)
		render(input_last_name)
		render(input_email)

		const {inputName, inputEmail, inputLastName} = getElements
		setValueInInput({inputName, inputEmail, inputLastName})

		expect(inputName).toBeTruthy()
		expect(screen.getByText(mocks.mockedErrors.name)).toBeTruthy()

		expect(inputLastName).toBeTruthy()
		expect(screen.getByText(mocks.mockedErrors.lastName)).toBeTruthy()

		expect(inputEmail).toBeTruthy()
		expect(screen.getByText(mocks.mockedErrors.email)).toBeTruthy()
	});

	it("Should be able to initially render empty fields and fill inputs, disabling the button", () => {
		render(<Form handleSubmitForm={mockedFunction} />)
		// const promise = Promise.resolve();

		const inputName = screen.getByPlaceholderText("Nome") as HTMLInputElement;
		const inputLastName = screen.getByPlaceholderText("Sobrenome") as HTMLInputElement;
		const inputEmail = screen.getByPlaceholderText("E-mail") as HTMLInputElement;

		const textOnFields = {
			name: inputName.textContent,
			email: inputEmail.textContent,
			lastName: inputLastName.textContent
		}

		expect(textOnFields).toMatchObject({ name: "", email: "", lastName: ""})

		fireEvent.input(inputName, { target: { value: "Meu Primeiro Nome" } });
		expect(inputName.value).toEqual("Meu Primeiro Nome")

		fireEvent.input(inputLastName, { target: { value: "Meu Segundo Nome"} });
		expect(inputLastName.value).toEqual("Meu Segundo Nome")

		fireEvent.input(inputEmail, { target: { value: "email@gmail.com"} });
		expect(inputEmail.value).toEqual("email@gmail.com")

		expect(screen.getByRole('button', { name: /salvar/i })).not.toBeDisabled();
		// await act(() => promise);
	});

	it("Should be able to fill in the fields and submit the form", async () => {
		render(<Form handleSubmitForm={mockedFunction} />)
		const promise = Promise.resolve();

		const inputName = screen.getByPlaceholderText("Nome") as HTMLInputElement;
		const inputLastName = screen.getByPlaceholderText("Sobrenome") as HTMLInputElement;
		const inputEmail = screen.getByPlaceholderText("E-mail") as HTMLInputElement;

		fireEvent.change(inputName, { target: { value: "Meu Primeiro Nome" } });

		fireEvent.change(inputLastName, { target: { value: "Meu Segundo Nome"} });

		fireEvent.change(inputEmail, { target: { value: "email@gmail.com"} });

		// const { inputEmail, inputLastName, inputName } = getElements
		// setValueInInput({inputEmail, inputLastName, inputName})
		const textInFieldsBeforeSubmit = {
			name: inputName.value,
			email: inputEmail.value,
			lastName: inputLastName.value
		}
		expect(textInFieldsBeforeSubmit).toMatchObject(mocks.inputWithValues)

		expect(textInFieldsBeforeSubmit).toMatchObject({ name: "Meu Primeiro Nome", lastName: "Meu Segundo Nome", email: "email@gmail.com"})

		const saveButton = screen.getByRole('button', { name: /salvar/i });

		fireEvent.click(saveButton)

		const textInFields = {
			name: inputName.value,
			email: inputEmail.value,
			lastName: inputLastName.value
		}

		expect(textInFields).toMatchObject({ name: "", email: "", lastName: ""})

		expect(mockedFunction).toHaveBeenCalledTimes(1);

		await act(() => promise);
	});

	it("Should be able button disabled", async () => {
		const promise = Promise.resolve();

		const { result } = await renderHook(() => useValidation({
			name: 'Nome é obrigatório',
			email: 'E-mail é obrigatório',
			lastName: 'Minimum 8 chars'
		}, FormValidations));

		result.current.hasErrors = true;
		result.current.errors = {
			name: 'Nome é obrigatório',
			email: 'E-mail é obrigatório',
			lastName: 'Minimum 8 chars',
		} as any;

		expect(result.current.errors).toMatchObject({email: "E-mail é obrigatório", lastName: "Minimum 8 chars", name: "Nome é obrigatório"})
		expect(result.current.hasErrors).toBe(true)

		render(
			<Input
				value="Meu nome"
				placeholder="Nome"
				touch={true}
				name="name"
				onChange={mockedFunction}
				label="Nome"
				error={result.current.errors.name}
			/>
		)

		const inputName = screen.getByPlaceholderText(/nome/i) as HTMLInputElement;
		expect(screen.getByText(/nome é obrigatório/i)).toBeTruthy()
		expect(inputName.value).toEqual("Meu nome")

		act(() => promise);
	});

	it("Should be able to disable and enable the button", async () => {
		const { result } = renderHook(() => useValidation({
			name: 'Nome é obrigatório',
			email: 'E-mail é obrigatório',
			lastName: 'Minimum 8 chars'
		}, FormValidations
		));

		result.current.hasErrors = true;

		render(
			<Button hasErrors={result.current.hasErrors}>Salvar</Button>
		)

		const saveButton = screen.getByRole("button", { name: /salvar/i })

		expect(saveButton).toBeDisabled();
		expect(saveButton).toHaveClass("disabled");

		result.current.hasErrors = false;

		render(
			<Button hasErrors={result.current.hasErrors}>Salvar Habilitado</Button>
		)

		const saveButtonEnable = screen.getByRole("button", { name: /Salvar Habilitado/i })

		expect(saveButtonEnable).not.toBeDisabled();
	});

	it("Should be able render Input with values for email and name", async () => {
		const { result } = renderHook(() => useValidation({
			name: 'Nome é obrigatório',
			email: 'E-mail é obrigatório',
			lastName: 'Minimum 8 chars'
		}, FormValidations
		));

		result.current.hasErrors = true;
		result.current.errors = {
			name: 'Nome é obrigatório',
			email: 'E-mail é obrigatório',
			lastName: 'Minimum 8 chars',
		} as any;

		const input = <Input
			placeholder="Nome"
			touch={false}
			name="name"
			onChange={mockedFunction}
			label="Nome"
			error={result.current.errors.name}
		/>

		const input_email = <Input
			placeholder="E-mail"
			touch={false}
			name="email"
			onChange={mockedFunction}
			label="Email"
			error={result.current.errors.email}
		/>

		render(input)
		const inputNameOne = screen.getByPlaceholderText("Nome") as HTMLInputElement
		expect(inputNameOne).toBeTruthy()
		fireEvent.change(inputNameOne, { target: { value: "Meu Primeiro Nome" }})

		render(input_email)
		const inputEmailOne = screen.getByPlaceholderText("E-mail") as HTMLInputElement
		expect(inputEmailOne).toBeTruthy()
		fireEvent.change(inputEmailOne, { target: { value: "MeuEmail@gmail.com" }})

		const name = inputNameOne.value;
		const email = inputEmailOne.value;
		render(
			<Input
				value={name}
				placeholder="Nome_"
				touch={false}
				name="name"
				onChange={mockedFunction}
				label="Nome"
				error={result.current.errors.name}
			/>
		)
		render(
			<Input
				value={email}
				placeholder="E-mail_"
				touch={false}
				name="email"
				onChange={mockedFunction}
				label="Email"
				error={result.current.errors.email}
			/>
		)// 2,16

		const newEmail = screen.getByPlaceholderText("E-mail_") as HTMLInputElement
		const newName = screen.getByPlaceholderText("Nome_") as HTMLInputElement
		expect(newEmail.value).toEqual("MeuEmail@gmail.com")
		expect(newName.value).toEqual("Meu Primeiro Nome")
	});
});
