// packages
import { useCallback, useState, useMemo } from 'react';


// parts
import HeaderControlls from "../../components/headerControlls"
import Modal from "../../components/Modal";
import UsersCrudForm from "./items/usersCrudForm";
import Table from "../../components/table";


const initialState = {
	name: "",
	lastName: "",
	email: ""
}

const Users = () => {
    // states
    const [open, setOpen] = useState(false);
	const [form, setForm] = useState(initialState);
    const handleClose = useCallback(() => {
        setOpen(false);
    }, [])

    const openModal = useCallback(() => {
		setForm({ name: "", lastName: "", email: "" })
        setOpen(true);
    }, [])

    const data = useMemo(
        () => [
            {
                col1: 'Igor Lúcio',
                col2: 'Vieira',
            },
            {
                col1: 'Fabiano',
                col2: 'Marcos',
            },
            {
                col1: 'Stella',
                col2: 'Resende',
            },
        ],
        []
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Nome',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Sobrenome',
                accessor: 'col2',
            },
        ],
        []
    )

	const handleSubmitForm = useCallback((e) => {
		e.preventDefault()
		handleClose();
	}, [handleClose])

    return (
        <div>
            <div className="container">
                <div className="pageHeader">
                    <h1 className="pageTitle">Usuários</h1>
                    <HeaderControlls onCreate={openModal} />
                </div>
                <Table data={data} columns={columns} />

                <Modal show={open} handleClose={handleClose}>
                    <UsersCrudForm
						handleSubmitForm={handleSubmitForm}
						setForm={setForm}
						form={form} />
                </Modal>
            </div>
        </div>
    )
}

export default Users;
