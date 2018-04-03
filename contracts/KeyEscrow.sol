pragma solidity ^0.4.18;

contract KeyEscrow {
    string public keyEscrow;
    
    function storeTransactions(string rawTransaction) public {
        keyEscrow = rawTransaction;
    }
}