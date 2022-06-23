// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Casino is Ownable {
   uint256 public bet;
   uint256 public prizePool;
   address payable[] public playersTeamA;
   address payable[] public playersTeamB;
   bool private betIsOpen = true;
   struct Player {
      uint256 amountBet;
      uint16 teamSelected;
    }
// The address of the player and team selected => the user info
   mapping(address => Player) public playerInfo;
   
   
  constructor() {
      bet = 100000000000000;
    }
    
function checkPlayerTeamA(address payable player) public view returns(bool){
      for(uint256 i = 0; i < playersTeamA.length; i++){
         if(playersTeamA[i] == player) return true;
      }
      return false;
    }

function checkPlayerTeamB(address payable player) public view returns(bool){
      for(uint256 i = 0; i < playersTeamB.length; i++){
         if(playersTeamB[i] == player) return true;
      }
      return false;
    }

function submitBet(uint8 _teamSelected) public payable {
      // require value sent for call == bet 
      // require that a person can not bet twice
      require(msg.value == bet);
      require(betIsOpen);
      require(!checkPlayerTeamA(payable(msg.sender)));

//If player exists in array, do not add wallet address to pool, but if has not bet yet, push wallet address, aka player to address pool
      if (!checkPlayerTeamA(payable(msg.sender)) && _teamSelected == 0){
        playersTeamA.push(payable(msg.sender));
      }

      if (!checkPlayerTeamB(payable(msg.sender)) && _teamSelected == 1){
        playersTeamB.push(payable(msg.sender));
      }
// Add value from msg.sender to prizePool
        prizePool += msg.value;
    }

// Pay Out for team 0 (A) or 1 (B)
function payOut(uint16 teamWinner) public onlyOwner {
        if (teamWinner == 0) {
            for(uint256 i = 0; i < playersTeamA.length; i++){
            playersTeamA[i].transfer((bet+(1/playersTeamA.length * playersTeamB.length)));
            }
            delete playersTeamA;
            delete playersTeamB;
            closeBet();
            }
            else if (teamWinner == 1) {
            for(uint256 i = 0; i < playersTeamB.length; i++){
            playersTeamB[i].transfer((bet+(1/playersTeamB.length * playersTeamA.length)));
            }
            delete playersTeamA;
            delete playersTeamB;
            closeBet();
            }
        }

// Withdraw remaining funds
function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

// Check Prize Pool
function checkPrizePool() public view returns(uint256){
       return prizePool;
    }

function openBet() public onlyOwner {
        betIsOpen = true;
    }

function closeBet() public onlyOwner {
        betIsOpen = false;
    }
}
