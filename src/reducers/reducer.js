import * as ActionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    accounts: [
        {
            ownerName: 'Monika',
            accountNumber: 35427652,
            cardNumber: 3527356,
            pinNumber: 1234,
            totalBalance: 10000,
            transactions: []
        },
        {
            ownerName: 'Prakash',
            accountNumber: 638346437,
            cardNumber: 9462722,
            pinNumber: 4321,
            totalBalance: 50000,
            transactions: []
        }
    ],
    dailyLimit: 50000,
    display: false
};

const addAccount = (state, action) => {
    let copyOfAccounts = [...state.accounts];
    copyOfAccounts.push(action.account);
    return updateObject(state, {
        accounts: copyOfAccounts,
        display: false
    });
};

const withdrawBalance = (state, action) => {
    let newAccounts = [...state.accounts];
    let foundAccount = newAccounts.filter(account => account.accountNumber == action.accountNumber);
    foundAccount[0].totalBalance = action.totalBalance;
    return updateObject(state, {
        accounts: newAccounts,
        display: false
    });
}

const viewTransactions = (state, action) => {
    let updatedAccounts = [...state.accounts];
    let accountFound = updatedAccounts.filter(account => account.accountNumber == action.accountNumber);
    accountFound[0].transactions.push(action.transaction);
    return updateObject(state, {
        accounts: updatedAccounts,
        display: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ACCOUNT: return addAccount(state, action);
        case ActionTypes.WITHDRAW_BALANCE: return withdrawBalance(state, action);
        case ActionTypes.VIEW_TRANSACTIONS: return viewTransactions(state, action);
        default: return state;
    }
}

export default reducer;