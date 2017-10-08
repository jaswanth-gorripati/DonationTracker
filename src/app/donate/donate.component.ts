import { Component, OnInit } from '@angular/core';
import { Web3ServiceService } from '../web3-service.service';
const contract = require('truffle-contract');
const donationTracker = require('../../../build/contracts/DonationsTracker.json');

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
public userAccount:any;
public web3:any;
  constructor(private _web3:Web3ServiceService ) { }
  _donationTracker = contract(donationTracker);
  public isDonating = false;
  public DonationAmount:any;
  public DonerPhno:any;
  public isLoading = false;
  public GotDonateMsg = false;
  public successDonateMsg:any;
  public TotalFunds:any;
  public RemainingFunds:any;
  ngOnInit() {
  	this._web3.getWeb3().then(res => {
  		this.web3 = res;
  		console.log(this.userAccount);
      this._donationTracker.setProvider(this.web3.currentProvider);
  	})
    this._web3.getUserAccount().then(res => {
      if(res != undefined){
         this.userAccount = res;
         this.fundsInfo();
        }
    })
  }
  public fundsInfo(){
    this. _donationTracker.deployed().then(instance =>{
      let ContractService = instance;
      ContractService.TotalFunds.call().then(res =>{
          this.TotalFunds = (res/1e18);
        })
      ContractService.RemainingFunds.call().then(res =>{
          this.RemainingFunds = (res/1e18);
        })
    })
  }
  donateFunds(){
    this.isLoading = true;
    this._web3.isFundsTransfered(this.userAccount,this.DonationAmount);
    this.checkIsMined();
  }
  checkIsMined(){
    let resp;
    this._web3.getIsTransfered().then(res => {
      resp = res;
    })
     setTimeout(()=>{
       if(resp === undefined){
         this.checkIsMined();
       }else{
         
            console.log(resp)
              if (resp == true){
                setTimeout(() =>{
                  this.isLoading = false;
                  console.log(this.isLoading);
                  this.GotDonateMsg = true;
                  this.successDonateMsg = true;
                  console.log(this.GotDonateMsg,this.successDonateMsg);
                  //this.fundsInfo();
                  setTimeout(() =>{
                    this.GotDonateMsg = false;
                    this.successDonateMsg = false;
                    console.log(this.isLoading);
                    this.DonationAmount = "";
                    this.DonerPhno = "";
                    this._web3.setIsTransferd()
                  },2000);
                },1000);
              }else{
                setTimeout(() =>{
                  this.isLoading = false;
                  this.GotDonateMsg = true;
                  this.successDonateMsg = false;
                  setTimeout(() =>{
                    this.GotDonateMsg = false;
                    this.successDonateMsg = false;
                    this.DonationAmount = "";
                    this.DonerPhno = "";
                    this._web3.setIsTransferd()
                  },2000);
                 },1000); 
              }   
       }
   },1000)
  }
  public PayFunds():any{
    this.isLoading = true;
    let isTrue:any;
    this. _donationTracker.deployed().then(instance =>{
      let contractService = instance;
     
      this.web3.eth.sendTransaction({from:this.userAccount,to:contractService.address,value:this.web3.toWei(this.DonationAmount,'ether'),gas:2222222},function(err, txHash) {
        if (!err){
         isTrue=true;
        }else{
          isTrue=false;
        }
      })
    })
    return isTrue;
  }


}
