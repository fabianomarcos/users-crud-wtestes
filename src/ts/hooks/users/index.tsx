/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Store users
import * as actions from "../../store/users/actions";
import * as types from "../../store/users/types";
import { RootState } from "../../store";

export const RetrieveUsers = () => {
	// -------------------------------------------------
	// Properties
	// -------------------------------------------------

	// hooks
	const dispatch = useDispatch();

	// store
	const list = useSelector((store: RootState) => store.users);

	// -------------------------------------------------
	// Effects
	// -------------------------------------------------

	useEffect(() => {
		dispatch(actions.fetchUsers());
	}, [dispatch]);

	// -------------------------------------------------
	// Response
	// -------------------------------------------------

	return list;
};

export const AddUser = () => {};

export const RemoveUser = () => {};

export const EditUser = () => {};
