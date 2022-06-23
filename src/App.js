import logo from './header-logo-2021.svg';
import './App.css';
import React, { Component, Fragment } from "react";
import Button from 'react-bootstrap/Button';
import { Card, Modal, Row } from 'react-bootstrap';
import Casino from "./Casino.json";
import Web3 from 'web3';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      netId: null,
      accounts: null,
      contract: null,
      networkError: false,
      connected: false,
      messageToUser: null,
      showModal: true,
      footerClassName: "copyright-fixed py-4 text-center text-white mb-auto"
    };

  }

  componentDidMount = async () => {
    if (!window.ethereum) {
    try {
      window.alert(`Get a wallet, you don't have one on your browser` )
    } catch (error) {
    // Catch any errors for any of the above operations.
      alert(
        `Failed to load...something?`,
      );
      console.error(error);
    }
  };
}

connectWallet = async () => {
  try {
    await window.ethereum.enable()
    // Get network provider and web3 instance.
    // const web3 = await getWeb3();
    const web3 = new Web3(Web3.givenProvider)
    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    this.setState({ netId: networkId });

    if (networkId === 80001) {
    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    // Set up contract Instance
    const instance = new web3.eth.Contract(
      Casino.abi,
      '0xDc15D3c022b3277f691571Ca9621596b87d16047',
    );
    // Set web3, accounts, and contract to the state
    this.setState({ web3, accounts, contract: instance, networkError: false, connected: true  });
    } else {
      console.log('not mumbai network ')
      console.log(this.state.accounts, "accounts")
      this.setState({ networkError: true })
    }
    } catch (error) {
    // Catch any errors for any of the above operations.
      alert(
        `Somthing is wrong. Terribly wrong`,
      );
      console.error(error);
    }
  }

  test = async () => {
    await console.log(this.state.accounts)
    console.log(this.state.contract)
  }

// close bet function for only owner / deployer
  closeBet = async () => {
    console.log(this.state.connected, 'this.state.connected being read')
     await this.state.contract.methods.closeBet().send({ from: this.state.accounts[0] })
      .on('transactionHash', (hash) => {
        this.setState({ messageToUser: `Here is your transaction Hash ${hash}` });
        console.log(hash);
      })
      .on('confirmation', function(confirmationNumber, receipt){
        this.setState({ messageToUser: `Congrats, you stopped the betting ${confirmationNumber}` });
        this.setState({ connected: false })
      })
      .on('error', (error) => {
        this.setState({ connected: true });
        this.setState({ messageToUser: 'Whoops! Want to try again?' })
        console.log('inside error', error);
      })
  }

  openBet = async () => {
    console.log(this.state.connected, 'this.state.connected being read')
     await this.state.contract.methods.openBet().send({ from: this.state.accounts[0] })
      .on('transactionHash', (hash) => {
        this.setState({ messageToUser: `Here is your transaction Hash ${hash}` });
        this.setState({ connected: false })
        console.log(hash);

      })
      .on('confirmation', function(confirmationNumber, receipt){
        this.setState({ messageToUser: `Congrats, you stopped the betting - confirmation # ${confirmationNumber} and ${receipt}` });
      })
      .on('error', (error) => {
        this.setState({ connected: true });
        this.setState({ messageToUser: 'Whoops! Want to try again?' })
        console.log('inside error', error);
      })
  }

  walletTriggerClicked = async () => {
    this.setState({ connected: false })
    this.setState({ messageToUser: 'Confirm your transaction in MetaMask' })
  }

  placeBetA = async () => {
    console.log(this.state.connected, 'this.state.connected being read')
     await this.state.contract.methods.submitBet(0).send({ from: this.state.accounts[0], value: 100000000000000 })
      .on('transactionHash', (hash) => {
        this.setState({ messageToUser: `Here is your transaction Hash ${hash}` });
        this.setState({ connected: false })
        console.log(hash);
      })
      // .on('confirmation', function(confirmationNumber, receipt){
      //   this.setState({ messageToUser: `Congrats, you just bet on team A here is your confirmation # ${confirmationNumber} and ${receipt}` });
      //   this.setState({ connected: false })
      // })
      .on('error', (error) => {
        this.setState({ connected: true });
        this.setState({ messageToUser: 'Whoops! Want to try again?' })
        console.log('inside error', error);
      })
  }

  placeBetB = async () => {
    console.log(this.state.connected, 'this.state.connected being read')
     await this.state.contract.methods.submitBet(1).send({ from: this.state.accounts[0], value: 100000000000000 })
      .on('transactionHash', (hash) => {
        this.setState({ messageToUser: `Here is your transaction Hash ${hash}` });
        this.setState({ connected: false })
        console.log(hash);
      })
      // .on('confirmation', function(confirmationNumber, receipt){
      //   this.setState({ messageToUser: `Congrats, you just bet on team B here is your confirmation # ${confirmationNumber} and ${receipt}` });
      //   this.setState({ connected: false })
      // })
      .on('error', (error) => {
        this.setState({ connected: true });
        this.setState({ messageToUser: 'Whoops! Want to try again?' })
        console.log('inside error', error);
      })
  }

  withdrawl = async () => {
    console.log(this.state.connected, 'this.state.connected being read')
     await this.state.contract.methods.withdrawl().send({ from: this.state.accounts[0] })
      .on('transactionHash', (hash) => {
        this.setState({ messageToUser: `Here is your transaction Hash ${hash}` });
        this.setState({ connected: false })
        console.log(hash);
      })
      // .on('confirmation', function(confirmationNumber, receipt){
      //   this.setState({ messageToUser: `Congrats, you just withdrew funds from contract, here is your confirmation # ${confirmationNumber} and ${receipt}` });
      //   this.setState({ connected: false })
      // })
      .on('error', (error) => {
        this.setState({ connected: true });
        this.setState({ messageToUser: 'Whoops! Want to try again?' })
        console.log('inside error', error);
      })
  }

  payOut = async () => {
    console.log(this.state.connected, 'this.state.connected being read')
     await this.state.contract.methods.payOut().send({ from: this.state.accounts[0] })
      .on('transactionHash', (hash) => {
        this.setState({ messageToUser: `Here is your transaction Hash for Payout ${hash}` });
        this.setState({ connected: false })
        console.log(hash);
      })
      // .on('confirmation', function(confirmationNumber, receipt){
      //   this.setState({ messageToUser: `Congrats, you just paid out the winners and ended the bet, here is your confirmation # ${confirmationNumber} and ${receipt}` });
      //   this.setState({ connected: false })
      // })
      .on('error', (error) => {
        this.setState({ connected: true });
        this.setState({ messageToUser: 'Whoops! Want to try again?' })
        console.log('inside error', error);
      })
  }


render () {

  let ownerJSX = ''
  if (this.state.accounts != null) {
    if (this.state.accounts.toString() === '0x83ca0B46a5D5CeD7420285d1252d3348649bF5fC') {
   ownerJSX = (
    <Card className='shadow mb-2 mx-auto' style={{ width: '50rem' }} id='owner-options-card'>
    <div className='mt-3 mb-2 mx-auto'> 
      Owner Settings
    </div>
    <Button variant='dark' className='mb-1 col-2 mx-auto' onClick={() => { this.openBet(); this.walletTriggerClicked() }}>Open Bet</Button>
    <Button variant='dark' className='mb-1 col-2 mx-auto' onClick={() => { this.closeBet(); this.walletTriggerClicked() }}>Hault Bets</Button>
    <Button variant='dark' className='mb-1 col-2 mx-auto' onClick={() => { this.withdrawl(); this.walletTriggerClicked() }}>Withdrawl</Button>
    <Button variant='dark' className='mb-1 mb-3 col-2 mx-auto' onClick={() => { this.payOut(); this.walletTriggerClicked() }}>Pay out</Button>
    
    </Card>
  )}}

function ModalForWrongNetwork (props) {
  return (<Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
    >
      <Modal.Body>
        <div className="d-flex mx-auto justify-content-center mb-2">
          <h3 className="row"> You are not on the right network! </h3>
        </div>
        <div className="d-flex mx-auto justify-content-center mb-5">
          <h4 className="row">Please switch network to Mumbai in your wallet, then try again</h4>
        </div>

        <div className="d-flex mx-auto justify-content-center">
        <h5 className=""> If you do not have Mumbai added to your MetaMask... </h5>
        </div>
        <div className="d-flex mx-auto justify-content-center">
        - Please click the link below for mumbai polyscan
        </div>
        <div className="d-flex mx-auto justify-content-center">
        - Scroll to the bottom of the page and click "Add Mumbai Network"
        </div>

        <div className="d-flex mx-auto justify-content-center pt-4">

          <a className="meta-link"
          href="https://mumbai.polygonscan.com/"
          >
          https://mumbai.polygonscan.com/
          </a>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>)
  }  


  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
          {/* <div className='d-flex col-3 justify-content-around mb-3 mx-auto'>
              <Button variant='dark' onClick={() => { this.test() }}>test</Button>
          </div> */}

        {window.ethereum ?
              <div className="d-flex container">
                {this.state.accounts === null ? 
                  <div className='d-flex mx-auto row justify-content-center mt-5 mb-2'>
                    <Button variant='dark' onClick={this.connectWallet}>Connect Wallet</Button>
                  </div> : ''}

                {this.state.networkError ?
                  <div>
                    <ModalForWrongNetwork
                      show={this.state.networkError}
                      onHide={() => this.setState({ networkError: false })}
                  />
                    {/* <p>You are NOT connected to Mumbai Network. Go to your wallet and switch Networks!</p> */}
                  </div> :
                  ''}

                {this.state.connected ?
                  <div className='container mt-5'>
                    <div className="row accounts-text justify-content-center col-6 mx-auto mb-2">
                        With
                      </div>
                      <div className="row accounts-text justify-content-center col-6 mx-auto">
                      {this.state.accounts}
                      </div>
                    <div className='d-flex col-5 mt-3 justify-content-around mb-3 mx-auto'>
                      <Button variant='dark' onClick={() => { this.placeBetA(); this.walletTriggerClicked() }}>Place Bet Team A</Button>
                      <Button variant='dark' onClick={() => { this.placeBetB(); this.walletTriggerClicked() }}>Place Bet Team B</Button>
                    </div>
                    <Button variant='dark' onClick={() => { this.setState({ accounts: null, connected: false, messageToUser: '' }) }}>Reset</Button>
                    <div className="justify-content-center col-6 mx-auto accounts-text">
                      <div className="row justify-content-center col-12 mt-4 mx-auto">
                        {ownerJSX}  
                      </div>
                    </div>
                  </div>
                  : 
                  <div className="row justify-content-around mb-3">
                         <p className='message-to-user mx-auto'>{this.state.messageToUser}</p> 
                  </div> }
              </div>
              : 
              <div className='d-flex mx-auto justify-content-center pt-5 mt-5'>
              <a href="https://metamask.io/">  Download MetaMask</a>
              </div> 
              }

      </div>

     {/* Footer section*/}
     <div className={this.state.footerClassName}>
          <div className="container footer"><small>Copyright © Will McDonnell 2022</small></div>
        </div>
    </Fragment>
  );
}
}

export default App;
