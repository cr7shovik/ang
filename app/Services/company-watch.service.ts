import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, timeout, map } from 'rxjs';
import { CompanyDetails } from '../Types/CompanyDetails';
import { WatchDetails } from '../Types/WatchDetails';

@Injectable({
  providedIn: 'root'
})
export class CompanyWatchService {

  url: string = 'http://localhost:8090/watch';
  company: CompanyDetails = {
    CompanyCode: 0,
    CompanyName: "",
    BriefDesc: "",
    CurrentStockPrice: 500
  };
  watchCompanies: CompanyDetails[] = []
  allUsersWatch !: WatchDetails[];

  constructor(private http: HttpClient) {
    http.get<WatchDetails[]>(this.url).subscribe(data => {
      this.allUsersWatch = data;
    })
  }



  addToWatch(companyCode: number, userId: number) {
    this.http.get<CompanyDetails>("http://localhost:8090/companies/" + companyCode.toString()).pipe(map(val => {
      console.log(val)
      return val;
    })).subscribe(response => {
      this.company = response;
      this.http.get<WatchDetails>(this.url + "/" + userId.toString()).pipe(map(val => {
        console.log(val)
        return val;
      })).subscribe(data => {
        this.watchCompanies = data.Companies;
        this.watchCompanies.push(this.company);
        var watchList = {
          id: userId,
          Companies: this.watchCompanies
        }
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(watchList);
        return this.http.put<WatchDetails>(this.url + "/" + userId.toString(), body, { headers: headers, observe: 'response' }).subscribe(response => {
          console.log(response.status)
        })
      })
    });
  }

  getWatchList(userId: number) {
    return this.http.get<WatchDetails>(this.url + "/" + userId.toString());
  }

  removeFromWatchList(userId: number, companyCode: number) {
    this.getWatchList(userId).pipe(map(val=>{
      console.log(val);
      return val;
    })).subscribe(data => {
      this.watchCompanies = data.Companies;
      console.log(this.watchCompanies);
      var popNum!: number;
      for (var i = 0; i < this.watchCompanies.length; i++) {
        if (this.watchCompanies[i].CompanyCode === companyCode) {
          popNum = i;
          break;
        }
      }
      this.watchCompanies.splice(popNum, 1);
      console.log(this.watchCompanies);
      var watchList = {
        id: userId,
        Companies: this.watchCompanies
      }
      
  
      const headers = { 'content-type': 'application/json' }
      const body = JSON.stringify(watchList);
  
      return this.http.put<WatchDetails>(this.url + "/" + userId.toString(), body, { headers: headers, observe: 'response' }).subscribe(response => {
        console.log(response.status)
      })
    })
  
  }
}
