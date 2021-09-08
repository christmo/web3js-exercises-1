import Web3 from 'web3';
import volcanoCoinArtifact from '../../build/contracts/VolcanoCoin.json';

const App = {
  web3: null,
  account: null,
  volcanoCoin: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      console.log('NetworkId', networkId);
      //const deployedNetwork = volcanoCoinArtifact.networks[networkId];
      const deployedNetwork = {
        address: '0x8D1978C9AFff244D50a7D8F5244EbA952295F7F8'
      };
      this.volcanoCoin = new web3.eth.Contract(
        volcanoCoinArtifact.abi,
        deployedNetwork.address
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      document.tx = { from: this.account };

      this.volcanoCoin.events
        .TransferEvent({})
        .on('data', function(event) {
          let sender = event.returnValues[0];
          let recipient = event.returnValues[1];
          let amount = event.returnValues[2];
          const eventElement = document.getElementsByClassName('event')[0];
          console.log(document.tx.from, sender, recipient);
          let text = '';
          if (document.tx.from == sender) {
            text = ' transferred ';
          } else {
            text = ' received ';
          }
          eventElement.innerHTML = 'You have' + text + amount;
        })
        .on('changed', changed => console.log('changed', changed))
        .on('connected', str => console.log('connected', str))
        .on('error', console.error);

      this.volcanoCoin.events
        .supplyChanged({})
        .on('data', function(event) {
          console.log(event.returnValues);
        })
        .on('changed', changed => console.log('changed', changed))
        .on('connected', str => console.log('connected', str))
        .on('error', console.error);

      this.refreshBalance();
    } catch (error) {
      console.error('Could not connect to contract or chain.', error);
    }
  },

  refreshBalance: async function() {
    //console.log(this.volcanoCoin.methods);
    const { getBalanceUser } = this.volcanoCoin.methods;
    const balance = await getBalanceUser(this.account).call();

    const balanceElement = document.getElementsByClassName('balance')[0];
    const accountElement = document.getElementsByClassName('accountId')[0];
    balanceElement.innerHTML = balance;
    accountElement.innerHTML = this.account;
  },

  sendCoin: async function() {
    const amount = parseInt(document.getElementById('amount').value);
    const receiver = document.getElementById('receiver').value;

    this.setStatus('Initiating transaction... (please wait)');

    const { transfer } = this.volcanoCoin.methods;
    let tx = await transfer(receiver, amount).send({ from: this.account });
    this.setStatus('Transaction complete!');
    this.refreshBalance();
  },

  increaseSupply: async function() {
    const { owner, supply, _increaseSupply } = this.volcanoCoin.methods;
    let supplyTx = await _increaseSupply().send({ from: this.account });
    //console.log(supplyTx)
    console.log('owner', await owner().call());
    console.log('supply', await supply().call());
  },

  setStatus: function(message) {
    const status = document.getElementById('status');
    status.innerHTML = message;
  }
};

window.App = App;

window.addEventListener('load', function() {
  if (window.ethereum) {
    // use volcanoCoinMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live'
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider('http://127.0.0.1:8545')
    );
  }

  App.start();
});
