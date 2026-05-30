// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Exercice6 {
uint[] public nombres;

    constructor() {
        nombres.push(10);
        nombres.push(20);
        nombres.push(30);
    }

    function ajouterNombre(uint n) public {
        nombres.push(n);
    }

    function getElement(uint index) public view returns (uint) {
        require(index < nombres.length, "Index invalide");
        return nombres[index];
    }

    function afficheTableau() public view returns (uint[] memory) {
        return nombres;
    }

    function calculerSomme() public view returns (uint) {
        uint somme = 0;
        for (uint i = 0; i < nombres.length; i++) {
            somme += nombres[i];
        }
        return somme;
    }
}
