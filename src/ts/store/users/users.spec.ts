import * as actions from "./actions";
import * as types from "./types";
import { store } from "..";
import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const middlewares = [thunk];

type DispatchExts = ThunkDispatch<types.UsersState, undefined, AnyAction>;
const mockStore = configureMockStore<types.UsersState, DispatchExts>(middlewares);

describe("Testing fetch user by email action creators", () => {
	it("Should create a action object with the FETCH_USER_BY_ID_SUCCESS shape", () => {
		const payload = {
			name: "",
			email: "",
			email_verified: "",
			password: "",
			sub: "",
			"user-type": "",
			createdDate: "",
		};

		const expectedAction = {
			type: types.FETCH_USER_BY_ID_SUCCESS,
			payload,
		};

		expect(actions.fetchUserByIdSuccess(payload)).toStrictEqual(expectedAction);
	});
});

describe("Testing fetch user by email failed action creators", () => {
	it("Should create a action object with the FETCH_USER_BY_ID_FAILED shape", () => {
		const payload = {
			name: "",
			message: "",
		};

		const expectedAction = {
			type: types.FETCH_USER_BY_ID_FAILED,
			payload,
		};

		expect(actions.fetchUserByIdFailed(payload)).toStrictEqual(expectedAction);
	});
});

describe("Testing edit user action creators", () => {
	it("Should create a action object with the EDIT_USER_SUCCESS shape", () => {
		const expectedAction = {
			type: types.EDIT_USER_SUCCESS,
		};

		expect(actions.editUserSuccess()).toStrictEqual(expectedAction);
	});
});

describe("Testing edit user failed action creators", () => {
	it("Should create a action object with the EDIT_USER_FAILED shape", () => {
		const payload = {
			name: "",
			message: "",
		};

		const expectedAction = {
			type: types.EDIT_USER_FAILED,
			payload,
		};

		expect(actions.editUserFailed(payload)).toStrictEqual(expectedAction);
	});
});

describe("Testing fetch users action creators", () => {
	it("Should create a action object with the FETCH_USERS_SUCCESS shape", () => {
		const payload = [
			{
				name: "",
				email: "",
				email_verified: "",
				password: "",
				sub: "",
				"user-type": "",
				createdDate: "",
			},
		];

		const expectedAction = {
			type: types.FETCH_USERS_SUCCESS,
			payload,
		};

		expect(actions.fetchUsersSuccess(payload)).toStrictEqual(expectedAction);
	});
});

describe("Testing fetch users failed action creators", () => {
	it("Should create a action object with the FETCH_USERS_FAILED shape", () => {
		const payload = {
			name: "",
			message: "",
		};

		const expectedAction = {
			type: types.FETCH_USERS_FAILED,
			payload,
		};

		expect(actions.fetchUsersFailed(payload)).toStrictEqual(expectedAction);
	});
});

describe("Testing action creators with the store", () => {
	it("EDIT_USER_SUCCESS should update the usersState", () => {
		let usersState = store.getState().users;

		store.dispatch({
			type: types.FETCH_USERS_SUCCESS,
		});

		setTimeout(() => {
			expect(usersState).toBe({
				users: [],
				errors: {},
			});
		}, 300);
	});
	it("EDIT_USER_FAILED should update the usersState", () => {
		let usersState = store.getState().users;

		const payload = {
			name: "Erro fictício",
			message: "EDIT_USER_FAILED fez a ação esperada",
		};

		store.dispatch({
			type: types.EDIT_USER_FAILED,
			payload: payload,
		});

		setTimeout(() => {
			expect(usersState).toBe({
				users: [{}],
				errors: {
					name: "Erro fictício",
					message: "EDIT_USER_FAILED fez a ação esperada",
				},
			});
		}, 300);
	});
	it("FETCH_USER_BY_ID_SUCCESS should update the usersState", () => {
		let usersState = store.getState().users;

		const payload = {
			name: "",
			email: "",
			email_verified: "",
			sub: "",
			"user-type": "",
			createdDate: "",
		};

		store.dispatch({
			type: types.FETCH_USER_BY_ID_SUCCESS,
			payload: payload,
		});

		setTimeout(() => {
			expect(usersState).toBe({
				users: [],
				selected: {
					name: "",
					email: "",
					email_verified: "",
					sub: "",
					"user-type": "",
					createdDate: "",
				},
				errors: {},
			});
		}, 300);
	});
	it("FETCH_USER_BY_ID_FAILED should update the usersState", () => {
		let usersState = store.getState().users;

		const payload = {
			name: "Erro fictício",
			message: "FETCH_USER_BY_ID_FAILED fez a ação esperada",
		};

		store.dispatch({
			type: types.FETCH_USER_BY_ID_FAILED,
			payload: payload,
		});

		setTimeout(() => {
			expect(usersState).toBe({
				users: [],
				selected: {},
				errors: {
					name: "Erro fictício",
					message: "FETCH_USER_BY_ID_FAILED fez a ação esperada",
				},
			});
		}, 300);
	});
	it("FETCH_USERS_SUCCESS should update the usersState", () => {
		let usersState = store.getState().users;

		const payload = [
			{
				name: "",
				email: "",
				email_verified: "",
				sub: "",
				"user-type": "",
				createdDate: "",
			},
		];

		store.dispatch({
			type: types.FETCH_USERS_SUCCESS,
			payload: payload,
		});

		setTimeout(() => {
			expect(usersState).toBe({
				users: [
					{
						name: "",
						email: "",
						email_verified: "",
						sub: "",
						"user-type": "",
						createdDate: "",
					},
				],
				errors: {},
			});
		}, 300);
	});
	it("FETCH_USERS_FAILED should update the usersState", () => {
		let usersState = store.getState().users;

		const payload = {
			name: "Erro fictício",
			message: "FETCH_USERS_FAILED fez a ação esperada",
		};

		store.dispatch({
			type: types.FETCH_USERS_FAILED,
			payload: payload,
		});

		setTimeout(() => {
			expect(usersState).toBe({
				users: [{}],
				errors: {
					name: "Erro fictício",
					message: "FETCH_USERS_FAILED fez a ação esperada",
				},
			});
		}, 300);
	});
});
