import logo from './header-logo-2021.svg';
import './App.css';
import React, { Component, Fragment } from "react";
import Button from 'react-bootstrap/Button';
import { Card, Modal } from 'react-bootstrap';
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
      messageToUser: '',
      showModal: true,
    };
    // this.mint = this.mint.bind(this);
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
    const deployedNetwork = Casino.networks[networkId];
    const instance = new web3.eth.Contract(
      Casino.abi,
      deployedNetwork && deployedNetwork.address,
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
  }

render () {

  let ownerJSX = ''

  if (this.state.accounts != null) {
    if (this.state.accounts.toString() === '0x83ca0B46a5D5CeD7420285d1252d3348649bF5fC') {
   ownerJSX = (
    <Card className='shadow mb-2 col-6 mx-auto' id='owner-options-card'>
    <div className='mt-3 mx-auto'> Owner Seetings
        
      </div>
      <div id='sub-title' className='mx-auto'> Something </div>
    
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
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter modal-title">
         You're not web3 life yet?
        </Modal.Title>
      </Modal.Header> */}
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
          <div className='d-flex col-3 justify-content-around mb-3 mx-auto'>
              <Button variant='dark' onClick={() => { this.test() }}>test</Button>
          </div>

        {window.ethereum ?
              <div className="d-flex">
                {this.state.accounts === null ? 
                  <div className='d-flex mx-auto justify-content-center mt-5 mb-2'>
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
                    <div className='d-flex col-3 justify-content-around mb-3 mx-auto'>
                      <Button variant='dark' onClick={() => { this.mint(); this.mintClicked() }}>Mint</Button>
                      <Button variant='dark' onClick={() => { this.setState({ accounts: null, connected: false, messageToUser: '' }) }}>Reset</Button>
                    </div>
                    <div className="row justify-content-center col-12 mx-auto accounts-text">
                      <div className="row accounts-text-with justify-content-center col-12 mx-auto">
                        With   
                      </div>
                      {this.state.accounts}
                      {ownerJSX}
                    </div>
                  </div>
                  : ''}
              </div>
              : 
              <div className='d-flex mx-auto justify-content-center pt-5 mt-5'> Get a Wallet
              <a href="https://metamask.io/">  https://metamask.io/ </a>
              </div> 
              }
        

      </div>
    </Fragment>
  );
}
}

export default App;
