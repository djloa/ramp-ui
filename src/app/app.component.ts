import { Component } from '@angular/core';
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
  email : string = 'a';
  loading: boolean = false;

  onChangeEvent(event: any){
    this.quotesService.getQuotes(event.target.value)
    .subscribe(
      (response) => {                           //next() callback
        console.log('response received')
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

  onSave(){
    console.log(this.email);
  }
}
