import logo from './logo.svg';
import './App.css';
import React, { Component, Fragment } from "react";
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
      this.setState({ showModal: true })
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

render () {
  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Fragment>
  );
}
}

export default App;
