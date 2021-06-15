// packages
import { useCallback, useMemo, useState } from "react";

// parts
import HeaderControlls from "../../components/headerControlls";
import Modal from "../../components/Modal";
import UsersCrudForm from "./items/usersCrudForm";
import Table from "../../components/table";

// hooks
import { RetrieveUsers } from "../../hooks/users";

// utils
// import { GetUsersColumn } from "./utils";

// types
import * as types from "../../store/users/types";

const Users = () => {
	// states
	const [open, setOpen] = useState(false);
	const [data, setData] = useState<types.UsersState>();

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const openModal = useCallback(() => {
		setOpen(true);
	}, []);

	useMemo(() => {
		const usersList = RetrieveUsers();

		setData(usersList);
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: "Nome",
				accessor: "name",
			},
			{
				Header: "Sobrenome",
				accessor: "lastName",
			},
			{
				Header: "E-mail",
				accessor: "email",
			},
		],
		[]
	);
	return (
		<div className="container">
			<main>
				<div className="pageHeader">
					<h1 className="pageTitle">Usuários</h1>
					<HeaderControlls onCreate={openModal} />
				</div>
				<div>
					<Table data={data} columns={columns} />
				</div>

				<Modal show={open} handleClose={handleClose}>
					<UsersCrudForm handleSubmitForm={() => {}} />
				</Modal>
			</main>
		</div>
	);
};

export default Users;
