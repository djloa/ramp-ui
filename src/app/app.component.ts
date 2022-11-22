import { Component, OnInit } from '@angular/core';
import { QuotesService } from './quotesService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  constructor(private quotesService: QuotesService) {
  }

  title = 'ramp-UI';
  currencyName : string = 'BNB';
  defaultCurrency = 'BNB';
  currency = {id:1,name:'BNB',img:'assets/bnb-seeklogo.com.svg'}
  amount : string = '';
  loading: boolean = false;

  onChangeEvent(event: any){
    this.quotesService.getQuotes(event.target.value, this.currencyName)
    .subscribe(
      (response) => {                           //next() callback
        console.log('response received ' + response.value)
       // this.repos = response; 
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
        //this.errorMessage = error;
        this.loading = false;
      },
      () => {                                   //complete() callback
        console.error('Request completed')      //This is actually not needed 
        this.loading = false; 
      })
    console.log(event.target.value);
  }

  currencies = [
    {id:1,name:'BNB',img:'assets/bnb-seeklogo.com.svg'},
    {id:2,name:'ETH',img:'assets/eth.png'},
  ]



  changeValue(value:any){
    this.currencyName = value.name;
    console.log(value.name)
  }

  onSave(){
    console.log(this.amount);
  }
}
