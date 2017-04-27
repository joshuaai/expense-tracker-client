import React, { Component } from 'react';
import {amountFormat} from '../utils/amount_format'

class AmountBox extends Component {
    render() {
        var panel = " panel panel-" + this.props.type;
        return (
            <div className="col-md-4">
                <div className={ panel }>
                    <div className="panel-heading">
                        { this.props.text }
                    </div>
                    <div className="panel-body">
                        {amountFormat(this.props.amount)}
                    </div>
                </div>
            </div>
        );
    }
}

AmountBox.propTypes = {
    type: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number.isRequired
};

export default AmountBox;