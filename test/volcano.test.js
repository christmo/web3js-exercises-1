const Volcano = artifacts.require("VolcanoCoin");
contract("Volcano", accounts => {
    it("should mint 10000 VolcanoCoin", async () => {
    const instance = await Volcano.deployed();
    //console.log(instance);
    const totalSupply = await instance.supply.call();
    console.log(totalSupply);
    assert.equal(
        totalSupply.toNumber(),
       10000,
        "Minting Failed",
        );            
    });
});