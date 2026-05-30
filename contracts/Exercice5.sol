// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Exercice5 {
function estPair(uint nombre) public pure returns (string memory) {
    if (nombre % 2 == 0) {
        return "Pair";
    } else {
        return "Impair";
    }
}
}
