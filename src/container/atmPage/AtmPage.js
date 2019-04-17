import React, { Component } from 'react';
import './atmPage.css';
import { connect } from 'react-redux';

class AtmPage extends Component {
    state = {
        accountNumber: null,
        showPinComponent: false,
        pinNumber: null,
        accountNumberError: null,
        pinNumberError: null
    };

    foundAccounts = () => {
        return this.props.accounts.filter(account => account.accountNumber == this.state.accountNumber);
    }

    validateAccountNumberInput = () => {
        //let realAccountNumber = this.props.accounts.map(account => account.accountNumber); this code is to get array of accountNumber only from accounts array
        if (this.state.accountNumber === '' || this.state.accountNumber === undefined || this.state.accountNumber === null) {
            this.setState({
                accountNumberError: 'Account Number is required!'
            })
            return false;
        }

        let foundAccounts = this.foundAccounts();

        if (foundAccounts.length === 0) {
            this.setState({
                accountNumberError: 'Account Number is incorrect!'
            })
            return false;
        }

        this.setState({
            accountNumberError: null
        });
        return true;
    };

    validatePinNumberInput = () => {
        let foundAccounts = this.foundAccounts();

        if (this.state.pinNumber === '' || this.state.pinNumber === undefined || this.state.pinNumber === null) {
            this.setState({
                pinNumberError: 'Pin number is required!'
            })
            return false;
        }

        if (foundAccounts[0].pinNumber != this.state.pinNumber) {
            this.setState({
                pinNumberError: 'Pin Number is incorrect!'
            })
            return false;
        }

        this.setState({
            pinNumberError: null
        });
        return true;
    };

    handleChange = (event) => {
        let state = { ...this.state };
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    isPinNumberValid = () => {
        let isPinNumberValid = this.validatePinNumberInput();
        if (!isPinNumberValid) {
            return;
        }
        this.props.history.push(`/atm-details/${this.state.accountNumber}`);
    }

    isAccountNumberValid = () => {
        let isAccountNumberValid = this.validateAccountNumberInput();
        if (!isAccountNumberValid) {
            return;
        }
        this.setState({ showPinComponent: true });
    }

    renderPinComponent = () => (
        <form className="atmForm">
            <div className="form-group row">
                <label htmlFor="colFormLabelSm" className="col-form-label col-form-label-sm">Pin Number:</label>
                <div className="col-sm-8">
                    <input type="password" onChange={this.handleChange} className="form-control form-control-sm" id="pinNumber" name="pinNumber" placeholder=" Enter your pin number" />
                    {this.state.pinNumberError ? <label className="accountNumberError" id="pinNumber">{this.state.pinNumberError}</label> : null}
                </div>
            </div>
            <button type="button" className="btn btn-primary doneButton" onClick={this.isPinNumberValid}>Done</button>

        </form>
    );

    render() {
        let atmForm = (
            <form className="atmForm">
                <div className="form-group row">
                    <label htmlFor="colFormLabelSm" className="col-form-label col-form-label-sm">Account Number:</label>
                    <div className="col-sm-8">
                        <input type="text" onChange={this.handleChange} className="form-control form-control-sm" id="accountNumber" name="accountNumber" placeholder=" Enter your account number" />
                        {this.state.accountNumberError ? <label className="accountNumberError" id="accountNumber">{this.state.accountNumberError}</label> : null}
                    </div>
                </div>

                <button type="button"
                    className="btn btn-primary doneButton"
                    onClick={this.isAccountNumberValid}>Done
                </button>
            </form>
        );

        return (
            <div>
                {/* {atmForm}
                { this.renderPinComponent()} */}
                {!this.state.showPinComponent ? atmForm : this.renderPinComponent()}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        accounts: state.accounts
    }
}

export default connect(mapStateToProps)(AtmPage);