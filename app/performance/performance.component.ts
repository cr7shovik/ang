import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { map } from 'rxjs';
import { CompanyService } from '../Services/company.service';
import { StockService } from '../Services/stock.service';
import { StockInfo } from '../Types/StockInfo';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {

  companyNames: string[] = ['Cognizant', 'Hewlett Packard', 'Wipro'];

  constructor(private stockService: StockService, private companyService: CompanyService) { }

  isSubmitted: boolean = false;

  tableDetails: StockInfo[] = []

  model = {
    companyName1: "",
    companyName2: "",
    fromDate: new Date(),
    toDate: new Date()
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    this.tableDetails=[]
    console.log(this.model)
    this.stockService.getStocks().subscribe(res => {
      var stocks = res;
      for (var i = 0; i < stocks.length; i++) {
        if (stocks[i].CompanyName === this.model.companyName1 || stocks[i].CompanyName === this.model.companyName2) {
          if (new Date(stocks[i].Date).getTime() >= new Date(this.model.fromDate).getTime() && new Date(stocks[i].Date).getTime() <= new Date(this.model.toDate).getTime()) { 
            stocks[i].Date = new Date(stocks[i].Date);
            this.tableDetails.push(stocks[i])
          }
        }
      }
    })


  }

}
