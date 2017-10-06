import { Component, OnInit } from '@angular/core';
import { Web3ServiceService } from '../web3-service.service';
const contract = require('truffle-contract');
const donationTracker = require('../../../build/contracts/DonationsTracker.json');


@Component({
  selector: 'app-request-payments',
  templateUrl: './request-payments.component.html',
  styleUrls: ['./request-payments.component.css']
})
export class RequestPaymentsComponent implements OnInit {

  constructor(private _web3:Web3ServiceService ) { }
  _donationTracker = contract(donationTracker);
  public MerchentAddress:any;
  public web3:any;
  public UserAccount:any;
  public ReqAmount:any;
  public invoiceRefNo:any;
  public ProductName:any;
  public Quantity:any;

  ngOnInit() {
    this._web3.getWeb3().then(res => {
      this.web3 = res;
      this.UserAccount = this.web3.eth.accounts[0];
      this._donationTracker.setProvider(this.web3.currentProvider);
      console.log(this.UserAccount);
    })
  }
  RequestPayment(){
  	this. _donationTracker.deployed().then(instance =>{
      let ContractService = instance;
      ContractService.RequestToPay(this.invoiceRefNo,this.ReqAmount,this.MerchentAddress,this.ProductName,{from:this.UserAccount,gas:222222}),function(err,txHash){
      	
      }
    })
  }

}
