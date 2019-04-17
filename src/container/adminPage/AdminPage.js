import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './admin.css';


class Accounts extends Component {
    render() {
        return (
            <div>
                <h3 className="heading-3">Accounts:</h3>
                <NavLink to="/add-new-account"><button className="btn btn-info button-add" >Add new account</button></NavLink>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Account Holder Name</th>
                            <th scope="col">Account Number</th>
                            <th scope="col">Card Number</th>
                            <th scope="col">Pin Number</th>
                            <th scope="col">Total Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.accounts.length > 0 ? this.props.accounts.map((account, index) => (
                            <tr key={index}>
                                <td>{account.ownerName}</td>
                                <td>{account.accountNumber}</td>
                                <td>{account.cardNumber}</td>
                                <td>{account.pinNumber}</td>
                                <td>{account.totalBalance}</td>
                            </tr>
                        )) : null
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        loading: state.loading
    }
};

export default connect(mapStateToProps)(Accounts);