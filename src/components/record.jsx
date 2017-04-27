import React from 'react';
import BaseComponent from './base_component';
import {amountFormat} from '../utils/amount_format';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Record extends BaseComponent {
    constructor(props) {
        super();
        this._bind('handleDelete', 'handleToggle', 'recordRow', 'recordForm', 'handleEdit');
        this.state = {
            edit: false
        };
    }

    handleDelete(event) {
        var id = this.props.record.id;
        event.preventDefault();
        axios({
            method: 'delete',
            url: `http://mestexpensetracker.herokuapp.com/api/v1/records/${id}`,
            success: ( (data) => {
                this.setState({ edit: false });
                this.props.handleEditRecord(this.props.record, data);
            })
        });
    }

    handleEdit(event) {
        event.preventDefault();
        var id = this.props.record.id;
        var data = {
            title: ReactDOM.findDOMNode(this.refs.title).value,
            date: ReactDOM.findDOMNode(this.refs.date).value,
            amount: ReactDOM.findDOMNode(this.refs.amount).value
        };
        console.log("before axios");
        axios({
            method: 'put',
            url: `http://mestexpensetracker.herokuapp.com/api/v1/records/${id}`,
            data: { record: data },
        }).then( function (data) {
            console.log(data);
            this.setState({ edit: false });
            this.props.handleEditRecord(this.props.record, data);
        }).catch(function(err) {
            console.log('err:  ');
            console.log(err);
        })
    }

    handleToggle(event) {
        event.preventDefault();
        this.setState({ edit: !this.state.edit })
    }

    recordRow() {
        return (
            <tr>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{amountFormat(this.props.record.amount)}</td>
                <td>
                    <a className="btn btn-default" onClick={this.handleToggle} > Edit </a>
                    <a className="btn btn-danger" onClick={this.handleDelete} > Delete </a>
                </td>
            </tr>
        );
    }

    recordForm() {
        return (
            <div className="container">
                <tr>
                    <td><input className="form-control" type="text" defaultValue={this.props.record.date} ref="date" /></td>
                    <td><input className="form-control" type="text" defaultValue={this.props.record.title} ref="title" /></td>
                    <td><input className="form-control" type="number" defaultValue={this.props.record.amount} ref="amount" /></td>
                    <td>
                        <a className="btn btn-default" onClick={this.handleEdit} >Update</a>
                        <a className="btn btn-danger" onClick={this.handleToggle} >Cancel</a>
                    </td>
                </tr>
            </div>
        );
    }

    render() {
        return this.state.edit ? this.recordForm() : this.recordRow();
    }
}

Record.propTypes = {
    record: React.PropTypes.object.isRequired,
    handleDeleteRecord: React.PropTypes.func.isRequired,
    handleEditRecord: React.PropTypes.func.isRequired
}

export default Record;