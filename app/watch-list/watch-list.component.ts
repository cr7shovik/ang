import { Component, OnInit } from '@angular/core';
import { CompanyWatchService } from '../Services/company-watch.service';
import { CompanyDetails } from '../Types/CompanyDetails';
import { WatchDetails } from '../Types/WatchDetails';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {

  companies: CompanyDetails[] = [];

  removeOn : boolean = true;
  watchOff : boolean = false;

  constructor(private watchService : CompanyWatchService) { 
    var num = localStorage.getItem("userId")
    var val : number;
    if(num === null){
      val = 0
    }
    else{
      val = parseInt(num);
    }
     this.watchService.getWatchList(val).subscribe(response=>{
      this.companies= response.Companies;
     });
  }

  ngOnInit(): void {
  }

}
