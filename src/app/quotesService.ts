import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class QuotesService {
  constructor(private http: HttpClient) {

  }

  baseURL: string = "localhost:1234/quotes?currency=ETH&amount=";

  getQuotes(amount: string): Observable<any> {
    return this.http.get(this.baseURL + amount)
  }
}
