import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Order } from './order';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  baseURL: string = "/api/fulfill-order";

  fulfillOrder(order:Order): Observable<any> {
    return this.http.post<Order>(this.baseURL, order, this.httpOptions);
  }
  handleError(): (err: any, caught: Observable<Order>) => import("rxjs").ObservableInput<any> {
    throw new Error('order failed.');
  }
}
