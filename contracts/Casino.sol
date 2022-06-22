// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Casino {
   address payable public owner;
   uint256 public bet;
   uint256 public prizePool;
   address payable[] public playersTeamA;
   address payable[] public playersTeamB;
   bool private betOpen = true;
   struct Player {
      uint256 amountBet;
      uint16 teamSelected;
    }
// The address of the player and team selected => the user info
   mapping(address => Player) public playerInfo;
   function() external payable {
   }
   
  constructor() public {
      owner = msg.sender;
      bet = 100000000000000;
    }
    
function checkPlayerInArrayTeamA(address payable player) public view returns(bool){
      for(uint256 i = 0; i < playersTeamA.length; i++){
         if(players[i] == player) return true;
      }
      return false;
    }

function checkPlayerInArrayTeamB(address payable player) public view returns(bool){
      for(uint256 i = 0; i < playersTeamB.length; i++){
         if(players[i] == player) return true;
      }
      return false;
    }

function submitBet(uint8 _teamSelected) public payable {
      //The first require is used to check if the player already exist
      //The second one is used to see if the value sended by the player is
      //Higher than the minimum value
      require(msg.value = bet);

//We set the player informations : amount of the bet and selected team
      playerInfo[msg.sender].amountBet = msg.value;
      playerInfo[msg.sender].teamSelected = _teamSelected;

//If player exists in array, do not add wallet address to pool, but if has not bet yet, push wallet address, aka player to address pool
      if (!checkPlayerInArrayTeamA(msg.sender) && _teamSelected == 0){
        playersTeamA.push(msg.sender);
      }

      if (!checkPlayerInArrayTeamB(msg.sender) && _teamSelected == 1){
        playersTeamB.push(msg.sender);
      }
//at the end, we increment the stakes of the team selected with the player bet
        prizePool += msg.value;
    }
    
// Generates a number between 1 and 10 that will be the winner
function payOut(uint16 teamWinner) public {
    
    //   address payable[1000] memory winners; // Creates temporary memory array
    //   uint256 winnerCount = 0; // This is the count for the array of winners
    //   uint256 loserCount = 0; // This is the count for the array of winners
    //   uint256 LoserBet = 0; //This will take the value of all losers bet
    //   uint256 WinnerBet = 0; //This will take the value of all winners bet
    //   address add;
    //   uint256 bet;
    //   address payable playerAddress;
//We loop through the player array to check who selected the winner team
        if (teamWinner = 0) {
            for(uint256 i = 0; i < playersTeamA.length; i++){
                playerAddress = playersTeamA[i];
        //If the player selected the winner team
                //We add his address to the winners array
                if(playerInfo[playerAddress].teamSelected == teamWinner){
                    winners[count] = playerAddress;
                    count++;
                }
            }
        //We define which bet sum is the Loser one and which one is the winner
            if ( teamWinner == 1){
                LoserBet = totalBetsTwo;
                WinnerBet = totalBetsOne;
            }
            else{
                LoserBet = totalBetsOne;
                WinnerBet = totalBetsTwo;
            }
        //We loop through the array of winners, to give ethers to the winners
            for(uint256 j = 0; j < count; j++){
                // Check that the address in this fixed array is not empty
                if(winners[j] != address(0))
                    add = winners[j];
                    bet = playerInfo[add].amountBet;
                    //Transfer the money to the user
                    winners[j].transfer((bet+(1/WinnerBet * LoserBet)));
            }
            
            delete playerInfo[playerAddress]; // Delete all the players
            players.length = 0; // Delete all the players array
            LoserBet = 0; // reset LoserBet
            WinnerBet = 0; // reset WinnerBet
            totalBetsOne = 0; // Reset TotalBetsOne pool
            totalBetsTwo = 0; // Reset TotalBetsTwo pool
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

// Check total bet pool of teamTwo
function checkTotalBetsTeamTwo() public view returns(uint256){
       return totalBetsTeamTwo;
    }
}

}
