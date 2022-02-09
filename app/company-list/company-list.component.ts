import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../Services/company.service';
import { AuthService } from '../Services/auth.service';
import { CompanyDetails } from '../Types/CompanyDetails';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies !: CompanyDetails[];
  removeOff : boolean = false;
  watchOn !: boolean;

  ngOnInit(): void {
  }

  constructor(private companyService: CompanyService, authService : AuthService) {
    this.watchOn = authService.isAuthenticated();
    console.log("Company List Component here");
    this.companyService.getCompanies().subscribe(response => {
      this.companies = response;
    }); 
  }

}
