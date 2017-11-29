import React from 'react';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';

const Actions = props => (
    <td width="25%">
        <button className="btn btn-warning" onClick={props.edit}><FaPencil/></button>
        <button className="btn btn-danger" onClick={props.delete}><FaTrash/></button>
    </td>
);

export default Actions;
