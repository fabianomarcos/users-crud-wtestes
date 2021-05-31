// packages
import { useCallback, useState, useMemo, useEffect } from 'react';


// parts
import HeaderControlls from "../../components/headerControlls"
import Modal from "../../components/Modal";
import UsersCrudForm from "./items/usersCrudForm";
import Table from "../../components/table";
import api from "../../services/api";

const Users = () => {
    // states
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [])

    const openModal = useCallback(() => {
        setOpen(true);
    }, [])

    useEffect(() => {
		(async () => {
			const users = await api.get("/users");
			setData(users.data)
			return users.data;
		})();
	},[]);

    const columns = useMemo(
        () => [
            {
                Header: 'Nome',
                accessor: 'name',
            },
            {
                Header: 'Sobrenome',
                accessor: 'lastName',
            },
            {
                Header: 'E-mail',
                accessor: 'email',
            },
        ],
        []
    )

	const handleSubmitForm = useCallback(async (user) => {
		handleClose();
		await api.post("/users", user);
		setData([...data, user] as any);
	}, [data, handleClose]);

    return (
        <div>
            <div className="container">
                <div className="pageHeader">
                    <h1 className="pageTitle">Usuários</h1>
                    <HeaderControlls onCreate={openModal} />
                </div>
                <Table data={data} columns={columns} />

                <Modal show={open} handleClose={handleClose}>
                    <UsersCrudForm handleSubmitForm={handleSubmitForm} />
                </Modal>
            </div>
        </div>
    )
}

export default Users;
