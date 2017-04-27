import React from 'react';
import BaseComponent from './base_component';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from "jquery";

import 'react-datepicker/dist/react-datepicker.css';

var initialState = {
    title: '', date: '', amount: '', user_id: 1
}

class RecordForm extends BaseComponent {
    constructor(props) {
        super(props);
        this._bind('handleChange', 'handleDateChange', 'valid', 'handleSubmit');
        this.state = initialState;
    }

    handleChange(event) {
        var name = event.target.name;
        var obj = {};
        obj[""+name] = event.target.value;
        this.setState(obj);
    }

    handleDateChange(momentDate) {
        const date = momentDate ? momentDate.format('YYYY-MM-DD') : undefined;
        this.setState({ date });
    }

    valid() {
        return this.state.title && this.state.date && this.state.amount;
    }

    handleSubmit(event) {
        event.preventDefault();
        $.post('http://mestexpensetracker.herokuapp.com/api/v1/records.json', {record: this.state}, (data) => {
            this.props.handleNewRecord(data);
            this.setState(initialState);
        });
    }

    render() {
        return (
            <div className="container">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <DatePicker type="text" className="form-control" placeholder="Date" 
                            name="date" value={this.state.date} selected={this.state.date && moment(this.state.date)} 
                            onChange={this.handleDateChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Title"
                            name="title" value={this.state.title} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" placeholder="Amount"
                            name="amount" value={this.state.amount} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!this.valid()}>
                        Create Record
                    </button>
                </form>
            </div>
        );
    }
}

RecordForm.propTypes = {
    handleNewRecord: React.PropTypes.func.isRequired
};

export default RecordForm;