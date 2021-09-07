//SPDX-License-Identifier: UNLICENSED

pragma solidity >0.8.0;

contract VolcanoCoin {
    uint256 public supply;
    address public owner;

    mapping(address => uint256) balance;
    mapping(address => Payment[]) record;
    event supplyChanged(uint256);

    event TransferEvent(address, address, uint256);
    //event TransferEventMessage(string);

    constructor() {
        supply = 10000;
        owner = msg.sender;
        _saveBalance(owner, supply);
    }

    struct Payment {
        address recipient;
        uint256 amount;
    }

    modifier onlyMe() {
        if (msg.sender == owner) {
            _;
        }
    }

    function _saveBalance(address user, uint256 money) public onlyMe {
        balance[user] = money;
    }

    function getBalanceUser(address user) public view returns (uint256) {
        return balance[user];
    }

    function getSupply() public view returns (uint256) {
        return supply;
    }

    function _increaseSupply() public onlyMe {
        supply = supply + 1000;
        emit supplyChanged(supply);
    }

    function transfer(address recipient, uint256 amount) public {
        uint256 balanceDebit = balance[msg.sender];
        uint256 balanceCredit = balance[recipient];
        require(balanceDebit >= amount, "Insuficient Founds");
        //if (balanceDebit >= amount) {
        balance[msg.sender] = balanceDebit - amount;
        balance[recipient] = balanceCredit + amount;
        Payment[] storage recordUser = record[recipient];
        recordUser.push(Payment({recipient: msg.sender, amount: amount}));
        record[recipient] = recordUser;
        emit TransferEvent(msg.sender, recipient, amount);
        //} else {
        //    emit TransferEventMessage("Insuficient funds");
        //}
    }

    function getRecord(address user) public view returns (Payment[] memory) {
        return record[user];
    }
}
