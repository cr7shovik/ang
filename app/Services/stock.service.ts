import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { CompanyDetails } from '../Types/CompanyDetails';
import { StockInfo } from '../Types/StockInfo';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  url: string = "http://localhost:8090/stock";
  constructor(private http: HttpClient) { }

  getStocks(){
    return this.http.get<StockInfo[]>(this.url);
  }

  getStockReport(companyCode1: number, companyCode2: number, fromDate: Date, toDate: Date) {
    var subject = new Subject<StockInfo[]>();
    this.http.get<StockInfo[]>(this.url).pipe(map(val => {
      var stocks = val;
      var companies: CompanyDetails[];
      var requiredStocks: StockInfo[] = [];

      this.http.get<CompanyDetails[]>("http://localhost:8090/companies").pipe(map(res => {

        companies = res;
        var companyName1!: string;
        var companyName2!: string;
        for (var i = 0; i < companies.length; i++) {
          if (companies[i].CompanyCode === companyCode1) {
            companyName1 = companies[i].CompanyName;
          }
          if (companies[i].CompanyCode === companyCode2) {
            companyName2 = companies[i].CompanyName;
          }
        }

        for (var i = 0; i < stocks.length; i++) {
          if (stocks[i].CompanyName === companyName1 || stocks[i].CompanyName === companyName2) {
            if (stocks[i].Date.getTime() >= fromDate.getTime() && stocks[i].Date.getTime() <= toDate.getTime()) {
              requiredStocks.push(stocks[i]);
            }
          }
        }
        subject.next(requiredStocks);
      }))
    }))
  }
}
