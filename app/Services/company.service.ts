import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { CompanyDetails } from '../Types/CompanyDetails';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  url: string = 'http://localhost:8090/companies';
  constructor(private http: HttpClient) { }

  getCompanies(): Observable<CompanyDetails[]> {
    return this.http.get<CompanyDetails[]>(this.url);
  }

  getCompanyCode(companyName : string){
    var subject = new Subject<number>();
    this.http.get<CompanyDetails[]>(this.url).pipe(map(val=>{
      var companies = val;
      var compNo = 0;
      for(var i = 0;i<companies.length;i++){
        if(companies[i].CompanyName=== companyName){
          compNo = companies[i].CompanyCode;
          break;
        }
      }
      subject.next(compNo);
    }))
    return subject.asObservable();
  }
}
