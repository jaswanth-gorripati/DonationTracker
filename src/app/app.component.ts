import { Component, OnInit } from '@angular/core';
import { Web3ServiceService } from './web3-service.service';
const contract = require('truffle-contract');
const donationTracker = require('../../build/contracts/DonationsTracker.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public IsOwner:any;
  constructor(private _web3:Web3ServiceService ) { }
  _donationTracker = contract(donationTracker);
  public UserAccount:any;
  public web3:any;

   ngOnInit() {
    this._web3.getWeb3().then(res => {
      this.web3 = res;
      this._donationTracker.setProvider(this.web3.currentProvider);
    })
    this._web3.getUserAccount().then(res => {
      if(res != undefined){
         this.UserAccount = this.web3.eth.accounts[0];
         this.isOwnerfn();
      }
    })
  }
  isOwnerfn(){
  	this.IsOwner = false;
     this. _donationTracker.deployed().then(instance =>{
      let ContractService = instance;
      ContractService.Owner.call().then(res =>{
          if(res === this.UserAccount){
          	this.IsOwner =true;
          	console.log("Can Request Payments")
          }else{
            console.log("not a owner");
          }
        })
    })
  }
  setUser(user){
    alert(user)
    this._web3.setUserAccount(user);
    setTimeout(()=>{
      this._web3.getUserAccount().then(res=>{
        alert(res);
        if(res != undefined){
          this.UserAccount = res;
          this.isOwnerfn();
        }
      })
    },2000)
  }

}

