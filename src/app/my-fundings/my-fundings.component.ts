import { Component, OnInit } from '@angular/core';
import { Web3ServiceService } from '../web3-service.service';
const contract = require('truffle-contract');
const donationTracker = require('../../../build/contracts/DonationsTracker.json');

@Component({
  selector: 'app-my-fundings',
  templateUrl: './my-fundings.component.html',
  styleUrls: ['./my-fundings.component.css']
})
export class MyFundingsComponent implements OnInit {

  constructor(private _web3:Web3ServiceService ) { }
  _donationTracker = contract(donationTracker);
  public Spendings:any;
  public web3:any;
  public UserAccount:any;
  public MyFundsInfo:any;
  public isLoading:any;

  ngOnInit() {
    this.isLoading = true;
    this._web3.getWeb3().then(res => {
      this.web3 = res;
      this._donationTracker.setProvider(this.web3.currentProvider);
      console.log(this.UserAccount);
    })
    this._web3.getUserAccount().then(res => {
      if(res != undefined){
         this.UserAccount = res;
          this.myFundsInfo();
        }
    })
  }
  myFundsInfo(){
    this. _donationTracker.deployed().then(instance =>{
      let ContractService = instance;
      ContractService.MyFunds.call(this.UserAccount).then(res =>{
          this.MyFundsInfo = [parseInt(res[0])/1e18,parseInt(res[1])/1e18,parseInt(res[2])/1e18]
        })
    })
    /*this._web3.fundsSpentEvents();
    setTimeout(() =>{
        this._web3.getFundsTransferEvent().then(res =>{
          this.Spendings = res;
          console.log(res);
        })
    },3000);*/
    this.getFundsSpent(0,[]);
  }
  getFundsSpent(index,arr){
    this. _donationTracker.deployed().then(instance =>{
      let ContractService = instance;
      let temp = arr;
     
        ContractService.MyFundsSpending.call(this.UserAccount,index).then(res =>{
          console.log(" funds Spent at ",index,res);
          temp.push({'Date':parseInt(res[0]),'Amount':parseInt(res[1]),'Incollaboration':parseInt(res[2]),'invoice':parseInt(res[3]),'To':(res[4]),'For':(res[5])});
          this.getFundsSpent(index+1,temp);
          
        }).catch( err =>{
          console.log("error");
          return;
        })
    
      setTimeout(() =>{
          this.Spendings = temp;
          this.isLoading = false;
      },3000);

    })
  }

}
