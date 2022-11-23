import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './analyticsService';
import { Order } from './order';
import { OrderService } from './orderService';
import { QuotesService } from './quotesService';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentcurrency: { id: number; name: string; img: string; };

  constructor(private quotesService: QuotesService, private orderService: OrderService, private analyticsService: AnalyticsService) {
    this.currentcurrency = this.currencies[0];

  }

  currencies = [
    {id:1,name:'BNB',img:'assets/bnb-seeklogo.com.svg'},
    {id:2,name:'ETH',img:'assets/eth.png'},
  ]
  ngOnInit(): void {
    this.getCurrentQuotes();
    this.getAnalytics();
    console.log(this.analyticsWallet)
    this.dataSource = [
      {wallet: this.analyticsWallet, currency: this.analyticsCurrency, count: this.analyticsCount, ammount: this.analyticsAmount},
    ];
  }


  title = 'ramp-UI';
  currencyName : string = 'BNB';
  defaultCurrency = 'BNB';
  amount : number = 100;
  conversion : string  = '';
  analyticsWallet : string  = '';
  analyticsCurrency : string  = '';
  analyticsCount: string  = '';
  analyticsAmount : string  = '';
  address: string = '';
  loading: boolean = false;
  order: Order = {
    cryptoUnitCount: 0,
    cryptoCurrencyName: '',
    walletAddress: ''
  }
  dataSource = [
    {wallet: this.analyticsWallet, currency: this.analyticsCurrency, count: this.analyticsCount, ammount: this.analyticsAmount}
  ];
  displayedColumns: string[] = ['wallet', 'currency', 'count', 'ammount'];



  private getCurrentQuotes() {
    this.quotesService.getQuotes(this.amount.toString(), this.currencyName)
      .subscribe(
        (response) => {
          console.log('response received ' + response.value);
          this.conversion = response.value;
          console.log('conversion: ' + this.conversion);
          // this.repos = response; 
        },
        (error) => {
          console.error('Request failed with error');
          //this.errorMessage = error;
          this.loading = false;
        },
        () => {
          console.error('Request completed'); //This is actually not needed 
          this.loading = false;
        });
  }

  private getAnalytics() {
    this.analyticsService.getAnalytics()
      .subscribe(
        (response) => {
          console.log('analytics received ' + JSON.stringify(response));
          this.analyticsWallet = response[0]._id.wallet;
          this.analyticsCurrency = response[0].totalAmount.$numberDecimal;
          this.analyticsAmount = response[0].totalAmount.$numberDecimal;
          this.analyticsCount = response[0].count;
          this.dataSource = [
            {wallet: this.analyticsWallet, currency: this.analyticsCurrency, count: this.analyticsCount, ammount: this.analyticsAmount},
          ];
          //this.conversion = response.value;
         // console.log('conversion: ' + this.conversion);
          // this.repos = response; 
        },
        (error) => {
          console.error('Request failed with error');
          //this.errorMessage = error;
          this.loading = false;
        },
        () => {
          console.error('Request completed'); //This is actually not needed 
          this.loading = false;
        });
  }

  onChangeAmount(event: any){
    this.amount = event.target.value
    this.getCurrentQuotes();
    this.conversion = event.target.value
    console.log(event.target.value);
  }

  



  onChangeCurrency(value:any){
    this.currencyName = value.name;
    this.currentcurrency = value;
    this.getCurrentQuotes();

    console.log('event: ' + JSON.stringify(value))
  }

  onChangeAddress(event:any){
+   console.log('address: ' + this.address)
    this.address = event.target.value;
    console.log('address: ' + this.address)
    this.validateForm();

    console.log('address: ' + JSON.stringify(event.target.value))
  }

  onSave(){
    console.log("save invoked")
    this.order.cryptoCurrencyName = this.currencyName;
    this.order.cryptoUnitCount = +this.conversion;
    this.order.walletAddress = '0xF7508d044d21169927dE87aa358E79b9E17561c9';

    this.orderService.fulfillOrder(this.order)
    .subscribe(
      (response) => {
        console.log('order response received ' + response.value);
        // this.repos = response; 
      },
      (error) => {
        console.error('Request failed with error');
        //this.errorMessage = error;
        this.loading = false;
      },
      () => {
        console.error('Request completed'); //This is actually not needed 
        this.loading = false;
      });

    console.log(this.amount);

  }
  validateForm(){
    return this.address === '';
  }
}
