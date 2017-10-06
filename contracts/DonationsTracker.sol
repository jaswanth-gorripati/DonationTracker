pragma solidity ^0.4.13;
contract Ownership{
    address public Owner;
    function Ownership() public{
       Owner = msg.sender;
    }
    modifier onlyOwner{
        if(msg.sender == Owner){
            _;
        }else{
            require(msg.sender==Owner);
        }
    }
    function kill() onlyOwner public returns(string){
        selfdestruct(msg.sender);
        return "Contract Killed";
    }
    event NewOwnerEvent(address NewOwnerAddress);
    function transferOwenership(address newOwner) onlyOwner public{
        Owner = newOwner;
        NewOwnerEvent(Owner);
    }
}
contract DonationsTracker is Ownership{
    
    
    uint internal FundsToPayCount = 0;
    struct FundsToPay{
        address FundsFrom;
        uint FundsAmount;
    }
    mapping (uint =>FundsToPay) PayFrom;
    
    event FundsAdded(address indexed From,uint FundAmount,uint OnBlockTime);
    
    function() public payable{
        MyFunds[msg.sender].FundAmount =  MyFunds[msg.sender].FundAmount+msg.value;
        MyFunds[msg.sender].RemainingFunds = MyFunds[msg.sender].FundAmount - MyFunds[msg.sender].SpentAmount;
        FundsGaveOn[msg.sender].push(FundsOn(msg.value,now));
        LenOFFunds[msg.sender] = LenOFFunds[msg.sender]+1;
        FundsAdded(msg.sender,msg.value,now);
        TotalFunds += msg.value;
        FundsToPayCount++;
        RemainingFunds =this.balance;
        FundsSpent = TotalFunds-RemainingFunds;
        PayFrom[FundsToPayCount] = FundsToPay(msg.sender,msg.value);
    }
   
    uint public TotalFunds = 0;
    uint public RemainingFunds = this.balance;
    uint public FundsSpent = TotalFunds-RemainingFunds;
    
   
    struct FundsOn{
        uint FundAmount;
        uint Date;
    }
    
    mapping (address => uint) public LenOFFunds;
    mapping (address => FundsOn[]) public FundsGaveOn;
   
    struct Funds{
        uint FundAmount;
        uint RemainingFunds;
        uint SpentAmount;
    }
    struct Spendings{
        uint OnDate;
        uint AmountSpent;
        uint InColoborationAmount;
        uint InvoiceNo;
        address SpentOnAddress;
        string ItemName;
    }
    
    mapping (address => Funds) public MyFunds;
    mapping (address => Spendings[]) public MyFundsSpending;
    

    event FundsSpent(address FromFunder,uint Amount,string ForPurchase,uint Date);
    function RequestToPay(uint invoiceNo,uint amountRequired,address toPayForAddress,string RequiredFor) onlyOwner public returns(bool IsPaid,string message,uint bal){
        uint amount = amountRequired * 1 ether;
        if(this.balance < amount){
            IsPaid = false;
            message ="Insufficient Funds in Contract";
            bal = amount;
            return;
        }else{
            GetRelaventFunds(amount);
            uint invoice = invoiceNo;
            uint len = PayingAddress.length;
            for(uint i=0;i<len;i++){
                MyFunds[PayingAddress[i].From].FundAmount = MyFunds[PayingAddress[i].From].FundAmount;
                MyFunds[PayingAddress[i].From].RemainingFunds -= PayingAddress[i].Amount;
                MyFunds[PayingAddress[i].From].SpentAmount += PayingAddress[i].Amount;
                MyFundsSpending[PayingAddress[i].From].push(Spendings(now,PayingAddress[i].Amount,amount,invoice,toPayForAddress,RequiredFor));
                FundsSpent(PayingAddress[i].From,PayingAddress[i].Amount,RequiredFor,now);
                delete PayingAddress[i];
            }
            toPayForAddress.transfer(amount);
            RemainingFunds = this.balance;
            FundsSpent = TotalFunds-RemainingFunds;
            IsPaid = true;
            message ="Succesfully Purchased :)";
            bal = amount;
            return;
        }
    }
    
    uint internal toPayFromIndex = 1;
    
    struct AddressPaying{
        address From;
        uint Amount;
    }
    AddressPaying[] PayingAddress;
    function GetRelaventFunds(uint requiredAmount) internal{
        uint AmountReached = 0;
        PayingAddress.length = 0;
        for(uint i=toPayFromIndex;AmountReached != requiredAmount;i++){
            if( PayFrom[i].FundsAmount !=0){
                if(PayFrom[i].FundsAmount < (requiredAmount-AmountReached)){
                    AmountReached += PayFrom[i].FundsAmount;
                    PayingAddress.push(AddressPaying(PayFrom[i].FundsFrom,PayFrom[i].FundsAmount));
                    delete PayFrom[i];
                    toPayFromIndex = i+1;
                    
                }else if(PayFrom[i].FundsAmount == (requiredAmount-AmountReached)){
                    AmountReached += PayFrom[i].FundsAmount;
                    PayingAddress.push(AddressPaying(PayFrom[i].FundsFrom,PayFrom[i].FundsAmount));
                    delete PayFrom[i];
                    toPayFromIndex = i+1;
                    
                }else{
                    PayingAddress.push(AddressPaying(PayFrom[i].FundsFrom,requiredAmount-AmountReached));
                    PayFrom[i].FundsAmount -= requiredAmount-AmountReached;
                    AmountReached += (requiredAmount-AmountReached);
                    toPayFromIndex = i;
                }
            }
        }
            
    }
}