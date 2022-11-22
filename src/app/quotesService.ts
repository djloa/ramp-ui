import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class QuotesService {
  constructor(private http: HttpClient) {

  }

  baseURL: string = "/api/quotes?currency=";

  getQuotes(amount: string, currencyName: string): Observable<any> {
    return this.http.get(this.baseURL + currencyName + '&amount=' +amount)
  }
}
