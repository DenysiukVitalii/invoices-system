import React from 'react';

const TableProducts = (props) => (
    <table className="table">
        <thead align="center" className="blue-background bold">
            <tr>
            <td>Product</td>
            <td>Quantity</td>
            </tr>
        </thead>
        <tbody>
            {props.account.map(product => 
            <tr key={product.id} align="center">
                <td width="70%">{product.name}</td>
                <td width="30%" align="center">
                    <input type="number" className="form-control" defaultValue={product.quantity} placeholder="Quantity" onChange={props.change(product)}/>
                </td>
            </tr>)
            }
        </tbody>
    </table>
);

export default TableProducts;