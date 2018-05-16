var EventStorage = artifacts.require("./EventStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(EventStorage);
};
