import React from 'react';
import BaseComponent from './base_component';
import AmountBox from '../components/amount_box';
import Record from '../components/record';
import RecordForm from '../components/record_form';
import { getRecordData } from '../utils/expense-tracker-api';

class Records extends BaseComponent {
    constructor(props) {
        super();
        this._bind('addRecord', 'updateRecord', 'deleteRecord', 'credits', 'debits', 'balance');
        this.state = { records: props.data };
    }

    getRecords() {
        getRecordData().then((records) => {
            this.setState({records});
        });
    }

    componentDidMount() {
        this.getRecords();
    }

    addRecord(record) {
        var records = React.addons.update(this.state.records, { $push: [record]});
        this.setState({ records: records });
    }

    updateRecord(record, data) {
        var index = this.state.records.indexOf(record);
        var records = React.addons.update(this.state.records, { $splice: [[index, 1, data]] });
        this.setState({ records: records });
    }

    deleteRecord(record) {
        var index = this.state.records.indexOf(record);
        var records = React.addons.update(this.state.records, {$splice: [[index, 1]]});
        this.setState({ records: records });
    }

    credits() {
        if (this.state.records) {
            return this.state.records
                .filter( (record) => {
                    return record.amount < 0;
                })
                .reduce( (previous, current) => {
                    return previous + parseFloat(current.amount);
                }, 0);
        } else {
            return 0;
        }
    }

    debits() {
        if (this.state.records) {
            return this.state.records
                .filter( (record) => {
                    return record.amount >= 0;
                })
                .reduce( (previous, current) => {
                    return previous + parseFloat(current.amount);
                }, 0);
        } else {
            return 0;
        }
    }

    balance() {
        return this.debits() + this.credits();
    }

    render() {
        console.log(this.state.records);
        if (this.state.records) {
            var records = this.state.records.map((record, index) => {
                return <Record key={record.id} record={record}
                            handleDeleteRecord={this.deleteRecord} handleEditRecord={this.updateRecord} />
            });
            return (
                <div className="container">
                    <div className="records">
                        <h2 className="title"> Expense Tracker </h2>
                        <div className="row">
                            <AmountBox type="success" amount={this.debits()} text="Credit"/>
                            <AmountBox type="danger" amount={this.credits()} text="Debit"/>
                            <AmountBox type="info" amount={this.balance()} text="Balance"/>
                        </div>
                        <RecordForm handleNewRecord={this.addRecord} />
                        <hr />
                        <table className="table table-bordered">
                            <thead>
                                <tr><th>Date</th><th>Title</th><th>Amount</th><th>Actions</th></tr>
                            </thead>
                            <tbody>{records}</tbody>
                        </table>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="records">
                        <h2 className="title"> Expense Tracker </h2>
                        <div className="row">
                            <AmountBox type="success" amount={this.debits()} text="Credit"/>
                            <AmountBox type="danger" amount={this.credits()} text="Debit"/>
                            <AmountBox type="info" amount={this.balance()} text="Balance"/>
                        </div>
                        <RecordForm handleNewRecord={this.addRecord} />
                        <hr />
                        <table className="table table-bordered">
                            <thead>
                                <tr><th>Date</th><th>Title</th><th>Amount</th><th>Actions</th></tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

Records.defaultProps = {
    records: []
};

export default Records