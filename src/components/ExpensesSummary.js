import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import TimePicker from 'rc-time-picker';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount === 1 ? 'Reservation' : 'Reservations';
    //const formattedExpensesTotal = numeral(expensesTotal / 100).format('00:00');


    return (
        <div className="page-header">
            <div className="content-container">
                <h2 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} </h2>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Reservation</Link>
                </div>
            </div>
        </div>
    );
 };

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);

    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);