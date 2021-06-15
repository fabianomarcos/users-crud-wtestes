import { createStore, combineReducers, applyMiddleware, Action } from "redux";

import thunk, { ThunkAction } from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { usersReducer } from "./users/reducers";

const rootReducer = combineReducers({
	users: usersReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
