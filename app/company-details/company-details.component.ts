import { Component, Input, OnInit } from '@angular/core';
import { CompanyService } from '../Services/company.service';
import { CompanyWatchService } from '../Services/company-watch.service';
import { CompanyDetails } from '../Types/CompanyDetails';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  @Input()showWatchButton !: boolean;
  @Input()showRemoveButton !: boolean;
  
  @Input() companyDetails !: CompanyDetails;

  constructor(private companyWatch : CompanyWatchService, authService : AuthService) {
  }

  onAddToWatch(companyCode : number, userId : number){
    this.companyWatch.addToWatch(companyCode,userId);
    alert("Successfully added to the watch list")
  }

  onRemoveFromWatch(companyCode : number,userId:number){
    this.companyWatch.removeFromWatchList(userId,companyCode);
    alert("Removed successfully from the watch list")
    window.location.reload();
  }
  ngOnInit(): void {
  }

}
