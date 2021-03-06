import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import TimePicker from 'rc-time-picker';

const ExpenseListItem = ({ id, description, note, amount, createdAt }) => (

  <Link className="list-item" to={`/edit/${id}`}>

{/* Handles time and currency formatting and display for records in db */}
        <div>
            <h3 className="list-item__title">{description}</h3>
            <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
            <br />
            <span className="list-item__sub-title"><i>{note}</i></span>
        </div>

        {/* <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3> */}
        <h3 className="list-item__data">{ amount }</h3>
        
    </Link>
);

export default ExpenseListItem;
