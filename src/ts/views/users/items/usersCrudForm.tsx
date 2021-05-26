import React from 'react';


const UsersCrudForm = (props: any) => {
    return (
        <form action="">
            <label>
                Nome:
                <input></input>
            </label>
            <label>
                Sobrenome:
                <input></input>
            </label>
            <label>
                E-mail:
                <input></input>
            </label>
            <button>Salvar</button>
        </form>
    )
}

export default UsersCrudForm;
