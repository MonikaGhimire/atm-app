import * as ActionTypes from './actionTypes';

export const onAddAccount = (account) => {
    return {
        type: ActionTypes.ADD_ACCOUNT,
        account: account,
    };
};

export const withdrawBalance = (totalBalance, accountNumber) => {
    return {
        type: ActionTypes.WITHDRAW_BALANCE,
        totalBalance: totalBalance,
        accountNumber: accountNumber
    };
};

export const viewTransactions = (transaction, accountNumber) => {
    return {
        type: ActionTypes.VIEW_TRANSACTIONS,
        transaction: transaction,
        accountNumber: accountNumber
    };
};