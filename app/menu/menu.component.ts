import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { switchMap, timeout, map } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isAuthenticated !: boolean;

  constructor(private authService: AuthService) {
    this.isAuthenticated = authService.isAuthenticated();
  }


  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    window.location.reload(); 
  }

}
