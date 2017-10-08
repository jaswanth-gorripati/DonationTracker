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
  public isLoading :any;

  ngOnInit() {
    this.isLoading = false;
    this._web3.getWeb3().then(res => {
      this.web3 = res;
      this._donationTracker.setProvider(this.web3.currentProvider);
    })
    this._web3.getUserAccount().then(res => {
      if(res != undefined){
          this.UserAccount = res;
          this._web3.fundsSpentEvents();
          console.log(this.UserAccount);
        }
    })
  }
  RequestPayment(){
    this.isLoading = true;
  	this. _donationTracker.deployed().then(instance =>{
      let ContractService = instance;
      let tx;
      ContractService.RequestToPay(this.invoiceRefNo,this.ReqAmount,this.MerchentAddress,this.ProductName,{from:this.UserAccount,gas:2222222}),function(err,txHash){
      	console.log("from req: ",txHash)
        if(err){
          console.log(err);
        }else{
          console.log("Requesting Payment Hash",txHash);
          tx = txHash;
        }
      }
      setTimeout(() =>{
        console.log("from set:",tx)
        if(tx!= undefined)
          this.isMined(tx);
        this.invoiceRefNo ="";
        this.ReqAmount="";
        this.MerchentAddress="";
        this.ProductName="";
        this.isLoading = false;
      },3000)
    })
  }
  isMined(tx){
    alert("checking for mining")
    console.log("mining tx:",tx);
    this.web3.eth.getTransactionReceipt(tx,function(err,result){
      if(err){
        alert("error while processing");
      }else if(result == null){
        this.isMined(tx);
      }else{
        alert("payment Succesfull");
      }
    })
  }
 }
