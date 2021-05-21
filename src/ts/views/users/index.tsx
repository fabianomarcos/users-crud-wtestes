// visuals

//parts
import Table from "ts/components/table";

const Users = () => {
    return (
        <div>
            <div>
                <h1 className="pageTitle">Usuários</h1>
            </div>
            <div className="container">
                <Table headers={["Nome"]} data={["Igor", "Fabiano", "Stella"] as any} />
            </div>
        </div>
    )
}

export default Users;
