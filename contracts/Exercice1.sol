// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Exercice1 {
  int public nbr1;
  int public nbr2;
  constructor(int nbr11, int nbr22)  {
    nbr1 = nbr11;
    nbr2 = nbr22;
}

  function addition1() public view returns (int) {
    return nbr1 + nbr2;
  }
  
  function addition2(int a, int b) public pure returns (int) {
    return a + b ;
  }

}
