import React, { Component } from 'react';
import './atmDetails.css';
import { connect } from 'react-redux';
import * as actions from '../../Actions/main';

class AtmDetailsContainer extends Component {
    state = {
        account: {
        },
        balance: null,
        balanceError: null,
        display: null
    };

    componentDidMount() {
        let foundAccounts = this.foundAccounts();
        if (foundAccounts.length > 0) {
            this.setState({ account: foundAccounts[0] });
        }
    };

    foundAccounts = () => {
        let accountNumber = this.props.match.params.accountNumber;
        return this.props.accounts.filter(account => account.accountNumber == accountNumber);
    }

    viewBalanceComponent = () => {
        if (this.state.display !== 'viewBalance') {
            return null;
        }
        return <label id="balanceLabel">
            Hi, {this.state.account.ownerName} your total banalnce available in your account is {this.state.account.totalBalance}</label>
    };

    handleChange = (event) => {
        let state = { ...this.state };
        state[event.target.name] = event.target.value;
        this.setState(state);
    };

    validateWithdrawBalanceInput = () => {
        if (this.state.balance === '' || this.state.balance === undefined || this.state.balance === null) {
            this.setState({
                balanceError: 'Balance is required!'
            })
            return false;
        }

        if(isNaN(this.state.balance)) {
            this.setState({
                balanceError: 'Please enter valid amount!'
            })
            return false;
        }

        if (this.state.balance > this.state.account.totalBalance) {
            this.setState({
                balanceError: 'You do not have sufficient balance in your account!'
            })
            return false;
        }

        if (this.state.balance > this.props.dailyLimit) {
            this.setState({
                balanceError: 'You cannot withdraw more than the limit!'
            })
            return false;
        }

        this.setState({
            balanceError: null
        });
        return true;

    }

    withdrawBalanceHandler = () => {
        let isValid = this.validateWithdrawBalanceInput();
        if (!isValid) {
            return
        }
        let account = { ...this.state.account }
        let remainingBalance = this.state.account.totalBalance - this.state.balance;
        account.totalBalance = remainingBalance;
        this.setState({ account: account });
        this.props.onWithdrawBalance(remainingBalance, this.props.match.params.accountNumber);

        this.viewTransactionsHandler();
    }

    withdrawComponent = () => {
        if (this.state.display !== 'withdrawMoney') {
            return null;
        }
        return (
            <form className="atmForm">
                <div className="form-group row">
                    <label htmlFor="colFormLabelSm" className="col-form-label col-form-label-sm">Balance:</label>
                    <div className="col-sm-8">
                        <input type="text" onChange={this.handleChange} className="form-control form-control-sm" id="balance" name="balance" placeholder=" Enter balance" />
                        {this.state.balanceError ? <label className="balanceError" id="balance">{this.state.balanceError}</label> : null}
                    </div>
                </div>
                <button type="button" className="btn btn-primary doneButton" onClick={this.withdrawBalanceHandler}>Done</button>
            </form>
        );
    };

    viewTransactionsComponent = () => {
        if (this.state.display !== 'viewTransaction') {
            return null;
        }
        const foundAccounts = this.foundAccounts();
        return (
            <div>
                <h3 className="heading-3">Transactions:</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Withdraw amount</th>
                            <th scope="col">Withdraw from</th>
                            <th scope="col">Remaining amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foundAccounts[0].transactions.length > 0 ? foundAccounts[0].transactions.map( (transaction, index) => (
                            <tr key={index}>
                            <td>{transaction.date}</td>
                            <td>{transaction.balance}</td>
                            <td>{transaction.ownerName} Atm</td>
                            <td>{transaction.totalBalance}</td>
                        </tr>
                        )) : null}
                    </tbody>
                </table>
            </div>
        );
    };

    viewTransactionsHandler = () => {
        const date = new Date();
        const fullDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
        let transaction = {
            date: fullDate,
            balance: this.state.balance,
            ownerName: this.state.account.ownerName,
            totalBalance: this.state.account.totalBalance
        }
        this.props.onViewTransactions(transaction, this.props.match.params.accountNumber);
    }

    onViewBalanceClick = () => {
        this.setState({ display: 'viewBalance' });
    };

    onWithDrawMoneyClick = () => {
        this.setState({ display: 'withdrawMoney' });
    };

    onViewTransactionClick = () => {
        this.setState({ display: 'viewTransaction' });
    };

    render() {
        return (
            <div>
                <div>
                    <button type="button" className="btn btn-secondary DetailsButtons" onClick={this.onViewBalanceClick}>View total balance</button>
                    <button type="button" className="btn btn-secondary DetailsButtons" onClick={this.onWithDrawMoneyClick}>Withdraw money</button>
                    <button type="button" className="btn btn-secondary DetailsButtons" onClick={this.onViewTransactionClick}>View transactions</button>
                </div>

                <div>
                    {this.viewBalanceComponent()}
                    {this.withdrawComponent()}
                    {this.viewTransactionsComponent()}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        dailyLimit: state.dailyLimit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onWithdrawBalance: (totalBalance, accountNumber) => dispatch(actions.withdrawBalance(totalBalance, accountNumber)),
        onViewTransactions: (transaction, accountNumber) => dispatch(actions.viewTransactions(transaction, accountNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AtmDetailsContainer);