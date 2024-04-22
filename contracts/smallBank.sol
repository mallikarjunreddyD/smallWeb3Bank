// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;
import "node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract smallBank is ERC20("ABCBank", "ABCBank") {
    struct lendingData {
        address lender;
        uint amount;
        uint lockingPeriod;
        bool status;
    }

    struct borrowingData {
        address borrower;
        uint amount;
        uint deadLine;
        bool status;
    }
    mapping(uint => lendingData) lenders;
    mapping(uint => borrowingData) borrowers;
    uint lendingID;
    uint borrowingID;
    uint lockingPeriod = 60 seconds;
    uint deadline = 60 seconds;
    uint interestRate = 8;
    address Bank;

    event Lend(uint lendingID, address lender, uint maturityAmount);
    event Borrow(uint borrowerID, address borrower, uint payableAmount);
    event MatureFD(uint lendingID, uint maturityAmount);
    event Payback(uint id, uint amount);

    constructor() {
        _mint(address(this), 10000000);
        Bank = msg.sender;
    }

    modifier onlyBank() {
        require(msg.sender == Bank, "Only bank can call");
        _;
    }
    //transferFrom Bank
    function transferFromBank(address receiver, uint amount) external {
        _transfer(address(this), receiver, amount);
    }
    //Lend
    function lend(uint256 amount) external {
        require(balanceOf(address(this))> amount,"Not enough balance to lend");
        transfer(address(this), amount);
        uint interest = (amount * interestRate) / 100;
        lenders[lendingID] = lendingData(
            msg.sender,
            amount + interest,
            block.timestamp + lockingPeriod,
            false
        );
        emit Lend(lendingID, msg.sender, amount + interest);
        lendingID++;
    }
    //Borrow
    function borrow(uint amount) external {
        checkCollatoral();
        _transfer(address(this), msg.sender, amount);
        uint interest = (amount * interestRate) / 100;
        borrowers[borrowingID] = borrowingData(
            msg.sender,
            amount + interest,
            block.timestamp + deadline,
            false
        );
        emit Borrow(borrowingID, msg.sender, amount + interest);
        borrowingID++;
    }
    //Collatoral
    function checkCollatoral() private {}

    //Withdraw
    function withDrawFD(uint id) external {
        require(lenders[id].lender == msg.sender, "Only lender should call");
        require(lenders[id].lockingPeriod < block.timestamp, "FD not matured");
        require(lenders[id].status == false, "FD withdrawn");
        _transfer(address(this), msg.sender, lenders[id].amount);
        lenders[id].status = true;
        emit MatureFD(lendingID, lenders[id].amount);
    }

    //Payback
    function payback(uint id, uint amount) external {
        require(
            amount >= borrowers[id].amount,
            "Not sufficient payable amount"
        );
        transfer(address(this), amount);
        borrowers[id].status = true;
        emit Payback(id, amount);
    }
}
