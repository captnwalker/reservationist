import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TimePicker from 'rc-time-picker';

//const date = new Date();
const now = moment();
console.log(now.format('MMM Do, YYYY' ));

export default class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);
    
    this.state = {
        description: props.expense ? props.expense.description : '',
        note: props.expense ? props.expense.note : '',
        amount: props.expense ? (props.expense.amount).toString() : '',
        createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
        calendarFocused: false,
        error: ''
        };
    }
    
    onDescriptionChange = (e) => {
        const description = e.target.value;
            this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
            this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        
        //if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
        //if (!amount || amount.match(^([0 - 1][0 - 9] | [2][0 - 3]):([0 - 5][0 - 9])$)) {
            this.setState(() => ({ amount }));
        //}
    };
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount) {
            this.setState(() => ({error: 'Please provide name and number in party.'}));
        } else {
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                description:this.state.description,
                amount: this.state.amount,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };

    render() {
        return (               
                <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <input
                        type="text"
                        placeholder="Guests' Last Name - # in Party"
                        autoFocus
                        className="text-input"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="TimePicker"
                        placeholder="Requested Time"
                        className="text-input"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    {/* Params for Calendar */}
                    <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={2}
                    isOutsideRange={() => false}
                    />
                    <textarea 
                    placeholder="Add a note for this reservation. Special Occassion? Food Alergies? Phone Number? (optional)"
                    className="text-area"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                    >
                    </textarea>
                    <div>
                        <button className="button" >Save New Reservation and/or Changes</button>
                    </div>                    
                </form>
            )
        }
    }