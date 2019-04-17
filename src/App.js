import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import { Switch, Route } from 'react-router-dom';
import AdminPage from './container/adminPage/AdminPage';
import AtmPage from './container/atmPage/AtmPage';
import AddAccounts from './container/addAccounts/AddAccounts';
import Notification from './components/Notification/Notification';
import AtmDetails from './container/atmPage/DetailsContainer';
class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path='/add-new-account' component={AddAccounts} />
        <Route path='/atm' component={AtmPage} />
        <Route exact path='/' component={AdminPage} />
        <Route path='/atm-details/:accountNumber' component={AtmDetails} />
      </Switch>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h2>ATM APP</h2>
        </header>
        <Navigation />
        <Notification />
        {routes}
      </div>
    );
  }
}

export default App;
