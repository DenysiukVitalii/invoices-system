import React from 'react';
import FaTrash from 'react-icons/lib/fa/trash';

const Table = props => (
    <table className="table table-hover">
        <Thead />
        <tbody>
        {props.invoices.map(e => (
                <tr key={e.id} align="center">
                    <td>{e.customer}</td>
                    <td>{e.discount}</td>
                    <td>{e.createdAt}</td>
                    <td>{e.updatedAt}</td>
                    <td>{e.total}</td>
                    <td>
                        <button className="btn btn-danger" onClick={() => props.deleteInvoice(e)}><FaTrash/></button>
                    </td>
                </tr>
                ))}
        </tbody>
    </table>
);

const Thead = () => (
    <thead align="center" className="blue-background bold">
        <tr>
            <td>Customer</td>
            <td>Discount</td>   
            <td>CreatedAt</td>      
            <td>UpdatedAt</td>
            <td>Total</td>       
            <td>Actions</td>
        </tr>
    </thead>
)

    
export default Table;