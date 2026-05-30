const Exercice1 = artifacts.require("Exercice1");
const Exercice2 = artifacts.require("Exercice2");
const Exercice3 = artifacts.require("GestionChaines");
const Exercice4 = artifacts.require("Exercice4");
const Exercice5 = artifacts.require("Exercice5");
const Exercice6 = artifacts.require("Exercice6");
const Exercice7 = artifacts.require("Rectangle");
const Exercice8 = artifacts.require("Payment");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Exercice1, 10, 20);
  deployer.deploy(Exercice2);
  deployer.deploy(Exercice3);
  deployer.deploy(Exercice4);
  deployer.deploy(Exercice5);
  deployer.deploy(Exercice6);
  deployer.deploy(Exercice7, 0, 0, 5, 3);
  deployer.deploy(Exercice8, accounts[0]);
};