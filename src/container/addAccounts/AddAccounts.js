import React, { Component } from 'react';
import './addAccounts.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/main';

class AddAccounts extends Component {
    state = {
        account: {},
        errors: {
            accountNumberError: null,
            nameError: null,
            cardNumberError: null,
            pinNumberError: null,
            balanceError: null
        }
    };

    validateAField = (field, value) => {
        let isFieldValid = true;
        switch (field) {
            case 'accountNumber': {
                let errors = { ...this.state.errors }
                if (this.isValueEmpty(value)) {
                    errors.accountNumberError = 'Account number is required!';
                    this.setState({ errors: errors });
                    isFieldValid = false;
                } else if (isNaN(value)) {
                    errors.accountNumberError = 'Account number is invalid!';
                    this.setState({ errors: errors });
                    isFieldValid = false;
                }
                else {
                    errors.accountNumberError = null;
                    this.setState({
                        errors: errors
                    });
                }
                break;
            }
            case 'ownerName': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value)) {
                    errors.nameError = 'Account holder name is required!';
                    this.setState({ errors });
                    isFieldValid = false;
                } else {
                    errors.nameError = null;
                    this.setState({ errors: errors });
                }
                break;
            }

            case 'cardNumber': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value)) {
                    errors.cardNumberError = 'Card number is required!';
                    this.setState({ errors: errors });
                    isFieldValid = false;
                } else if (isNaN(value)) {
                    errors.cardNumberError = 'Card number is invalid!';
                    this.setState({ errors: errors });
                    isFieldValid = false;
                }
                else {
                    errors.cardNumberError = null;
                    this.setState({ errors: errors });
                }
                break;
            }

            case 'pinNumber': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value)) {
                    errors.pinNumberError = 'Pin number is required!';
                    this.setState({ errors: errors });
                    isFieldValid = false;
                } else if (isNaN(value)) {
                    errors.pinNumberError = 'Pin number is invalid!';
                    this.setState({ errors: errors });
                    isFieldValid = false;
                }
                else {
                    errors.pinNumberError = null;
                    this.setState({ errors: errors });
                }
                break;
            }

            case 'totalBalance': {
                let errors = { ...this.state.errors };
                if (this.isValueEmpty(value)) {
                    errors.balanceError = 'Total balance is required!';
                    this.setState({ errors: errors });
                    isFieldValid = false;
                } else if (isNaN(value)) {
                    errors.balanceError = 'Please enter valid amount!';
                    this.setState({ errors: errors });
                    isFieldValid = false;
                }
                else {
                    errors.balanceError = null;
                    this.setState({ errors: errors });
                }
                break;
            }
            default: return isFieldValid;
        }

        return isFieldValid;
    }

    isValueEmpty = (value) => {
        return !value;
    }

    handleChange = (event) => {
        event.preventDefault();

        let isValid = this.validateAField(event.target.name, event.target.value);
        if (!isValid) {
            return;
        }

        let account = { ...this.state.account };
        account[event.target.name] = event.target.value;
        this.setState({ account: account });
    };

    handleClick = () => {
        this.props.onAddAccount(this.state.account);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <form className="AddForm">
                    <h3>Add account:</h3>
                    <div className="from-group">
                        <input onChange={this.handleChange} type="text" className="form-control" name="ownerName" id="OwnerName" placeholder="Enter account holder name" />
                        {this.state.errors.nameError ? <label className="Errors">{this.state.errors.nameError}</label> : null}

                        <input onChange={this.handleChange} type="text" className="form-control" name="accountNumber" id="accountNumber" placeholder="Enter account number" />
                        {this.state.errors.accountNumberError ? <label className="Errors">{this.state.errors.accountNumberError}</label> : null}

                        <input onChange={this.handleChange} type="text" className="form-control" name="cardNumber" id="cardNumber" placeholder="Enter card number" />
                        {this.state.errors.cardNumberError ? <label className="Errors">{this.state.errors.cardNumberError}</label> : null}

                        <input onChange={this.handleChange} type="text" className="form-control" name="pinNumber" id="pinNumber" placeholder="Enter pin number" />
                        {this.state.errors.pinNumberError ? <label className="Errors">{this.state.errors.pinNumberError}</label> : null}

                        <input onChange={this.handleChange} type="text" className="form-control" name="totalBalance" id="totalBalance" placeholder="Enter total balance" />
                        {this.state.errors.balanceError ? <label className="Errors">{this.state.errors.balanceError}</label> : null}
                    </div>
                    <button type="button"
                        className="btn btn-primary button"
                        onClick={this.handleClick}>Add account</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddAccount: (account, history) => dispatch(actions.onAddAccount(account, history))
    }
}

export default connect(null, mapDispatchToProps)(AddAccounts);