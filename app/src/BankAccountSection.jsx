import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import BankAccountTable from './BankAccount/BankAccountTable'
import BankAccountChart from './BankAccount/BankAccountChart'
// TODO:    
//          1) Add delete button so that the list can be removed at any time

// Peter Yeung: ReactJS used huge amount of syntax similar with lambda expression

export default class BankAccountSection extends React.Component {
  constructor(props) {
    super(props);
    //this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
    // save data in state
    this.state = {
      size: 0,
      inputAccountName: '',
      inputAccountAmount: '',
      accountList: [],
    };
  }


  editAccountAmount = (row, amount) => {
    this.accountList[row].amount.setState({ amount });
  }


  createAccountObject = (name, amount) => {
    return { name: this.name, amount: this.amount };
  }


  // Note we should use this.setState instead directly accessing the elements.
  // See http://jamestw.logdown.com/posts/258005-reactjs-state
  addAccount = () => {

    if (!isValidate(this.state.inputAccountName, this.state.inputAccountAmount))
      return;

    const accountList = this.state.accountList;

    this.state.accountList.push({
      name: this.state.inputAccountName,
      amount: this.state.inputAccountAmount
    });

    this.setState({ size: this.state.size + 1 });
    this.setState({ accountList });
  }


  // It is necessarily to create a function acting as middleman between the components and the textbox values.
  updateInputAccountName = (name) => {
    this.setState({
      inputAccountName: name.target.value
    });
  }


  updateInputAccountAmount = (amount) => {
    this.setState({
      inputAccountAmount: amount.target.value
    });
  }


  updateBankAccountList = (updatedAccountList) => {
    this.setState({accountList: updatedAccountList});
  }


  getAccountNameValidation = (accountList) => {

    if (accountList == null) return null;

    const accountName = this.state.inputAccountName;
    var index = accountList.findIndex(i => i.name === accountName);

    if (index !== -1 || !accountName) return 'error';
    else return 'success';

  }

  
  getAccountAmountValidation = () => {

    if (isValidate("", this.state.inputAccountAmount)) return 'success';
    else return 'error';
  
  }

  
  // Rendering section
  render = () => {
    // get data from state, not from props
    const accountList = this.state.accountList;

    return (
      <div>
        <div className="col-md-6 divider-right-4px">
          <BankAccountTable accountList={accountList} updateParentAccountList={this.updateBankAccountList} />

          <Form>
            <FormGroup controlId="formBasicText" validationState={this.getAccountNameValidation(accountList)}>

              <ControlLabel>Bank account&#39;s name</ControlLabel>
              <FormControl
                type="text"
                className="bankaccount-name-textbox"
                placeholder="Enter account's name"
                value={this.state.inputAccountName}
                onChange={name => this.updateInputAccountName(name)}
              />
            </FormGroup>

            <FormGroup controlId="formBasicText" validationState={this.getAccountAmountValidation()}>
              <ControlLabel>Amount</ControlLabel>
              <FormControl
                type="text"
                className="bankaccount-amount-textbox"
                placeholder="Amount"
                value={this.state.inputAccountAmount}
                onChange={amount => this.updateInputAccountAmount(amount)}
              />

            </FormGroup>
          </Form>

          <button className="addButton" onClick={this.addAccount}>Add account</button>
        </div>
        <div className="col-md-6">
          <BankAccountChart accountList={accountList} />
        </div>
      </div>
    );
  }
}


function isValidate(name, amount) {

  if (isNaN(amount) || !isFinite(amount) || amount < 0) {
    return false;
  }

  return true;
}