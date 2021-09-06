const Volcano = artifacts.require("VolcanoCoin");
contract("Volcano", accounts => {
    it("should mint 10000 VolcanoCoin", async () => {
        const instance = await Volcano.deployed();
        //console.log(instance);
        const totalSupply = await instance.supply.call();
        //console.log(totalSupply);
        assert.equal(
            totalSupply.toNumber(),
            10000,
            "Minting Failed",
        );
    });
    it("should increase supply VolcanoCoin in 1000 tokens", async () => {
        const instance = await Volcano.deployed();
        //console.log(instance);
        const totalSupplyBefore = await instance.supply.call();
        assert.equal(
            totalSupplyBefore.toNumber(),
            10000,
            "Minting Failed",
        );
        await instance._increaseSupply();
        const totalSupplyAfter = await instance.getSupply.call();
        assert.equal(
            totalSupplyAfter.toNumber(),
            11000,
            "Minting Failed",
        );
    });
    it("should send coin correctly", async () => {
        const instance = await Volcano.deployed();
    
        const account1 = accounts[0];
        const account2 = accounts[1];
    
        // get initial balances
        const initBalance1 = await instance.getBalanceUser.call(account1);
        const initBalance2 = await instance.getBalanceUser.call(account2);
    
        // send coins from account 1 to 2
        const amount = 10;
        await instance.transfer(account2, amount, { from: account1 });
    
        // get final balances
        const finalBalance1 = await instance.getBalanceUser.call(account1);
        const finalBalance2 = await instance.getBalanceUser.call(account2);
    
        assert.equal(
          finalBalance1.toNumber(),
          initBalance1.toNumber() - amount,
          "Amount wasn't correctly taken from the sender",
        );
        assert.equal(
          finalBalance2.toNumber(),
          initBalance2.toNumber() + amount,
          "Amount wasn't correctly sent to the receiver",
        );
    });
});