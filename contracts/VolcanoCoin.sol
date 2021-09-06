//SPDX-License-Identifier: UNLICENSED

pragma solidity >0.8.0;


contract VolcanoCoin {
    uint public supply;
    address public owner;
    
    mapping(address => uint) balance;
    mapping(address => Payment[]) record;
    event supplyChanged(uint);
    
    event Log(uint);
    event LogMessage(string);
    
    constructor() {
        supply = 10000;
        owner = msg.sender;
        _saveBalance(owner, supply);
    }
    
    struct Payment{
        address recipient;
        uint amount;
    }
    
    modifier onlyMe(){
        if(msg.sender == owner){
            _;
        }
    }
    
    function _saveBalance(address user, uint money) public onlyMe {
        balance[user] = money;
    }
    
    function getBalanceUser(address user) public view returns(uint){
        return balance[user];
    }
    
    function getSupply() public view returns(uint){
        return supply;
    }
    
    function _increaseSupply() public onlyMe {
        supply = supply + 1000;
        emit supplyChanged(supply);
    }
    
    function transfer(address recipient, uint amount) public {
        uint balanceDebit = balance[msg.sender];
        uint balanceCredit = balance[recipient];
        if(balanceDebit >= amount){
            balance[msg.sender] = balanceDebit - amount;
            balance[recipient] = balanceCredit + amount;
            
            Payment[] storage recordUser = record[recipient];
            recordUser.push(Payment({recipient:msg.sender,amount:amount}));
            record[recipient] = recordUser;
            emit Log(balance[recipient]);
        } else {
            emit LogMessage("Insuficient funds");
        }
    }
    
    function getRecord(address user) public view returns(Payment[] memory){
        return record[user];
    }
    
}