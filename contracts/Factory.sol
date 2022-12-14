// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import {ISuperfluid, ISuperToken, ISuperApp, ISuperAgreement, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {EmploymentLoan} from "./EmploymentLoan.sol"; 
import {Scoring} from "./Scoring.sol";

//import {EmploymentLoan} from "./EmploymentLoan.sol";
contract Factory {
    /// @notice counter which is iterated +1 for each new loan created.
    /// @dev Note that the value begins at 0 here, but the first one will start at one.
    uint256 private loanId;             //Private reduces size of contract
    /// @notice mapping of loanId to the loan contract
    mapping(uint256 => EmploymentLoan) public idToLoan;   

    /// @notice mapping of loan owner (i.e. the msg.sender on the call) to the loan Id
    mapping(address => uint256) public employmentLoanOwners;

    
    /// @notice Creates new loan contract.
    /// @param _borrowAmount Amount to borrow.
    /// @param _interestRate Interest rate.
    /// @param _paybackMonths Number of months for repayment.
    /// @param _employer Employer address.
    /// @param _borrower Borrower address.
    /// @param _borrowToken Token to borrow.
    /// @param _host Superfluid host.
    /// @return Loan ID.

    
    
    function createNewLoan(
        
        int256 _borrowAmount,
        int8 _interestRate,
        int8 _paybackMonths,
        address _employer,
        address _lender,
        address _borrower,
     //TODO: INTEGRATION WITH GELATO
     /*    address payable _ops,        
        address _treasury, */         
          
        ISuperToken _borrowToken,
        ISuperfluid _host,
        address _scoring
    ) external returns (uint256) {

        EmploymentLoan newLoan = new EmploymentLoan(
            _borrowAmount,
            _interestRate,
            _paybackMonths,
            _employer,
            _lender,
            _borrower,
            _borrowToken,
            _host,
            _scoring
        /*     _ops,
             _treasury */
        );
        loanId++;
        idToLoan[loanId] = newLoan;
        employmentLoanOwners[msg.sender] = loanId;
        return loanId;
    }
 

    function getLoanAddressByID(uint _id) public view returns (EmploymentLoan) {
        return idToLoan[_id];
    }

    /// @notice Query loan address from owner.
    /// @param _owner Employee.
    /// @return Loan Address.
    function getLoanByOwner(address _owner) public view returns (uint) {
        return employmentLoanOwners[_owner];
    }  
 
 
}
