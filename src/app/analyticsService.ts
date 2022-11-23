import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AnalyticsService {
  constructor(private http: HttpClient) {

  }

  baseURL: string = "/api/admin/analytics";

  getAnalytics(): Observable<any> {
    return this.http.get(this.baseURL)
  }
}
