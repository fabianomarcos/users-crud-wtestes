
// packages
import React from 'react';
import { useTable } from 'react-table';

// visuals


const Users = () => {
    const data = React.useMemo(
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

    const columns = React.useMemo(
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

    const tableInstance = useTable({ columns, data } as any);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <div>
            <div>
                <h1 className="pageTitle">Usuários</h1>
            </div>
            <div className="container">
                <table {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map(column => (
                                            // Apply the header cell props
                                            <th {...column.getHeaderProps()}>
                                                {// Render the header
                                                    column.render('Header')}
                                            </th>
                                        ))}
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {// Loop over the table rows
                            rows.map(row => {
                                // Prepare the row for display
                                prepareRow(row)
                                return (
                                    // Apply the row props
                                    <tr {...row.getRowProps()}>
                                        {// Loop over the rows cells
                                            row.cells.map(cell => {
                                                // Apply the cell props
                                                return (
                                                    <td {...cell.getCellProps()}>
                                                        {// Render the cell contents
                                                            cell.render('Cell')}
                                                    </td>
                                                )
                                            })}
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;
