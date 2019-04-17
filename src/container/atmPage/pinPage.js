import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class PinComponent extends Component {
    state = { 
        pinNumber: null,
        pinNumberError: null
     };

     validatePinNumberInput = () => {
        let realPinNumber = this.props.accounts.map(account => account.pinNumber);
        console.log(realPinNumber[0]);
        if (this.state.pinNumber === '' || this.state.pinNumber === undefined || this.state.pinNumber === null) {
            this.setState({
                pinNumberError: 'Pin Number is required!'
            })
            return false;
        } else if (this.state.pinNumber !== realPinNumber[0]) {
            this.setState({
                pinNumberError: 'Pin Number is incorrect!'
            })
            return false;
        }
        let clearError = { ...this.state.pinNumberError };
        clearError = null;
        this.setState({
            pinNumberError: clearError
        });
        return true;
    };

    handleChange = (event) => {
        this.validatePinNumberInput();
        let state = { ...this.state };
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    isPinNumberValid = () => {
        let isPinNumberValid = this.validatePinNumberInput();
        if (!isPinNumberValid) {
            return;
        }
    }

    render() { 
        return ( 
            <form className="atmForm">
                <div className="form-group row">
                    <label htmlFor="colFormLabelSm" className="col-form-label col-form-label-sm">Pin Number:</label>
                    <div className="col-sm-8">
                    <input type="password" onChange={this.handleChange} className="form-control form-control-sm" id="pinNumber" name="pinNumber" placeholder=" Enter your pin number" />
                        {this.state.pinNumberError ? <label className="accountNumberError" id="pinNumber">{this.state.pinNumberError}</label> : null}
                    </div>
                </div>
               <NavLink to='/atm-details'><button type="button" className="btn btn-primary doneButton" onClick={this.isPinNumberValid}>Done</button></NavLink> 
            </form>
         );
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts
    }
}
 
export default connect(mapStateToProps)(PinComponent);