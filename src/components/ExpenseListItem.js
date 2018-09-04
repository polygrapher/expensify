import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({id, description, amount = 0, createdAt = 0}) => (
    <li>
        <h3><Link to={`/edit/${id}`}>{description}</Link></h3>
        <p>Amount: {numeral(amount / 100).format('$0,00.00')}</p>
        <p>Created At {moment(createdAt).format('MMMM Do, YYYY')}</p>
    </li>
);

export default ExpenseListItem;