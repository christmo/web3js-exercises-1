# web3js-exercises-1
Encode Academy - Web 3 Exercise 1 - Webpack VolcanoCoin

# Install
1. ```npm i````
2. update and create file .env in the root
```.env
MNEMONIC="twelve words of wallet ... metamask"
ROPSTEN_URL=https://ropsten.infura.io/v3/<infura.io token>
KOVAN_URL=https://kovan.infura.io/v3/<infura.io token>
RINKEBY_URL=https://rinkeby.infura.io/v3/<infura.io token>
MAINNET_URL=https://mainnet.infura.io/v3/<infura.io token>
```
3. truffle console --network=rinkeby
4. compile

# Steps

1. Install Webpack and investigate the code
2. In an empty directory unbox webpack
```sh
npx truffle unbox webpack
```
3. Run ganache
```sh
npx ganache-cli
```
4. In a separate terminal run the truffle console
```sh
npx truffle console
```
5. Compile and migrate the contracts
```sh
compile
migrate
```
6. now start the front end, move to the app directory
```sh
cd app
```
7. start the dev server
```sh
npm run dev
```

# Contract

https://rinkeby.etherscan.io/address/0x8d1978c9afff244d50a7d8f5244eba952295f7f8

# Infura.io Configuration

https://nhancv.medium.com/deploy-smart-contract-with-truffle-79d2bf218332


