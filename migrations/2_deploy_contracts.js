// eslint-disable-next-line no-undef
const Casino = artifacts.require("Casino.sol");

module.exports = function(deployer) {
    deployer.deploy(Casino);
};