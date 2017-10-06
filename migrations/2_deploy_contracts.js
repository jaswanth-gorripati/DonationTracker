var donationsTracker = artifacts.require("./DonationsTracker.sol");

module.exports = function(deployer) {
  deployer.deploy(donationsTracker);
};
