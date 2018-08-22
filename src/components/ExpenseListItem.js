import React from 'react';
import {Link} from 'react-router-dom';

const ExpenseListItem = ({id, description, amount = 0, createdAt = 0}) => (
    <li>
        <h3><Link to={`/edit/${id}`}>{description}</Link></h3>
        <p>Amount: {amount}</p>
        <p>Created At {createdAt}</p>
    </li>
);

export default ExpenseListItem;