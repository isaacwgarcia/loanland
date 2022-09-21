// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Scoring {
    //address public immutable factoryAddress;
    address private  admin;
    struct Score{
        uint totalLoans;
        uint totalPaid;
        uint closedUnpaid;
    }
    mapping(address => Score) private reputation;

    constructor (           
        //address _factoryAddress
         
    ) {
       // factoryAddress = _factoryAddress;
        admin = msg.sender;
    }

 /*    modifier onlyadmin() {
        require(msg.sender == admin, "Only Admin can set reputation");
        _;
    } */

    function openLoan (address borrower) external returns (uint256){

        Score storage score = reputation[borrower];
        score.totalLoans  = score.totalLoans + 1;
        return  (score.totalLoans);

    }
    function payLoan (address borrower) external returns (uint256){

        Score storage score = reputation[borrower];
        score.totalPaid  = score.totalPaid + 1;
        return  (score.totalPaid);

    }

    function closeUnpaid (address borrower) external returns (uint256){

        Score storage score = reputation[borrower];
        score.closedUnpaid  = score.closedUnpaid + 1;
        return  (score.closedUnpaid);

    }

    // function getAdmin( ) public view returns (address) {
      
      
    //     return admin;
    // }
    function getOpenLoans(address _address) public view returns (uint) {
      
        uint value = reputation[_address].totalLoans - reputation[_address].totalPaid;

        return value;
    }
    function getPaidLoans(address _address) public view returns (uint) {
      
        uint value = reputation[_address].totalPaid;

        return value;
    }

     function getUnpaid(address _address) public view returns (uint) {
      
        uint value = reputation[_address].closedUnpaid;

        return value;
    }



     function getScore(address _address) public view returns (Score memory) {
      
        Score memory score = reputation[_address];

        return score;
    }


}

// TODO: Do more advanced scoring by analysing channel closures. (by third parties)