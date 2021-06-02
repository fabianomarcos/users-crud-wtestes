/* eslint-disable react/jsx-key */

// packages
import React from 'react';
import { useTable } from "react-table";

// styles
import style from "./style.module.scss";

// types
import PropsInterface from "./types";

const Table = (props: PropsInterface) => {
	const { data, columns } = props;

	const tableInstance = useTable({ columns, data } as any);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;

	return (
		<table className={style.table} {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							// Apply the header cell props
							<th {...column.getHeaderProps()}>
								{
									// Render the header
									column.render("Header")
								}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return (
									<td {...cell.getCellProps()}>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Table;
