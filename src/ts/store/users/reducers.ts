import {
	UsersState,
	UsersActionTypes,
	FETCH_USERS_SUCCESS,
	FETCH_USER_BY_ID_FAILED,
	FETCH_USER_BY_ID_SUCCESS,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAILED,
	FETCH_USERS_FAILED,
	EDIT_USER_SUCCESS,
	EDIT_USER_FAILED,
} from "./types";

const initialState: UsersState = {
	count: 0,
	limit: 0,
	page: 0,
	totalPages: 0,
	users: [],
	selected: {
		firstName: "",
		lastName: "",
		email: "",
		createdAt: "",
		updatedAt: "",
	},
	errors: {},
};

export function usersReducer(state = initialState, action: UsersActionTypes): UsersState {
	switch (action.type) {
		case FETCH_USERS_SUCCESS:
			return {
				...state,
				users: action.payload,
			};
		case FETCH_USERS_FAILED:
			return {
				...state,
				errors: action.payload,
			};
		case CREATE_USER_SUCCESS:
			return {
				...state,
			};
		case CREATE_USER_FAILED:
			return {
				...state,
				errors: action.payload,
			};
		case FETCH_USER_BY_ID_SUCCESS:
			return {
				...state,
				selected: action.payload,
			};
		case FETCH_USER_BY_ID_FAILED:
			return {
				...state,
				errors: action.payload,
			};
		case EDIT_USER_SUCCESS:
			return {
				...state,
			};
		case EDIT_USER_FAILED:
			return {
				...state,
				errors: action.payload,
			};
		default:
			return state;
	}
}
