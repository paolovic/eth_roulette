// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract VRFv2Consumer is VRFConsumerBaseV2 {
  VRFCoordinatorV2Interface COORDINATOR;

  uint64 s_subscriptionId; // Your subscription ID.
  // Rinkeby values; we could use another testnet
  address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab; // Rinkeby coordinator.
  bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc; // The gas lane to use, which specifies the maximum gas price to bump to.

  // maximum gas which can be consumed in the callback function
  uint32 callbackGasLimit = 200000;

  // The default is 3, but you can set this higher.
  uint16 requestConfirmations = 3;

  uint32 numWords =  1; //maximum number of returned values. Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.

  uint256[] public s_randomWords;
  uint256 public s_requestId;
  address s_owner;

  //added variables
  uint256 public spinResult; //result of the roulette: number between 0 and 36
  uint256 public payout; //money which is going to be given to the player
  address payable public casinoAddress;
  uint256 private minBet = 100;
  struct Bet { 
        uint256 amount;
        uint8[] numbers;
        address payable playerAddress;
  }
  mapping(bytes32 => Bet) public betRecord; //this mapping allow us to relate the player's data with the random number id

  //events
  event Win(Bet bet, uint256 result);
  event Lose(Bet bet, uint256 result);

  // run when the contract is deployed
  constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
    COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
    s_owner = msg.sender;
    s_subscriptionId = subscriptionId;

    // the casino address will be the address which is actually deploying the contract
    casinoAddress = payable(msg.sender);
  }
  
  // callback function: chainlink calls this function after generating the random numbers
  function fulfillRandomWords(
    uint256, /* requestId */
    uint256[] memory randomWords
  ) internal override {
    s_randomWords = randomWords;

    // actual result of the roulette
    spinResult = s_randomWords[0] % 36;

    //casting of the id number given for chainlink
    bytes32 id = bytes32(s_requestId);

    // we check for each player's number if it matches the roulette result
    for(uint8 i=0; i<betRecord[id].numbers.length; i++){
      if(spinResult == betRecord[id].numbers[i]){
          // transfer  
          betRecord[id].playerAddress.transfer(payout);
          emit Win(betRecord[id], spinResult);
          break;
      } 
    }
    emit Lose(betRecord[id], spinResult);
  }

  // this function allows to add ETH to the deployed contract (=casino contract)
  function addBalance() external payable {}

  // function to spin the roulette
  function spinRoulette(uint8[] memory numbers) external payable{

    // we check if the bet is below the minimum
    require(msg.value >= minBet, "Your bet has to be higher than the minimum one!");

    // we calculate the reward
    payout = msg.value * (36/numbers.length);

    // we check the money of the casino
    require(casinoAddress.balance >= payout, "The casino has not enough funds!");

    // ask for random value to chainlink
    s_requestId = COORDINATOR.requestRandomWords(
      keyHash,
      s_subscriptionId,
      requestConfirmations,
      callbackGasLimit,
      numWords
    );

    // store player data
    betRecord[bytes32(s_requestId)] = Bet({
      amount: msg.value,
      numbers: numbers,
      playerAddress: payable(msg.sender)
    });

  }

}