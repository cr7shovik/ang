import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Types/User';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users !: User[]
  url: string = "http://localhost:8090/users";

  constructor(private http: HttpClient,private router : Router) { }

  isAuthenticated(): boolean {
    var loggedIn = localStorage.getItem("userId");
    if (loggedIn == "" || loggedIn == null) {
      return false;
    }
    else {
      return true;
    }
  }

  validate(email: string, password: string) {
    var userId: number = 0;
    console.log("Here")
    this.http.get<User[]>(this.url).pipe(map(val=>{
      return val;
    })).subscribe(data => {
      this.users = data;
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].Email === email && this.users[i].Password == password) {
          userId = this.users[i].UserId;
          break;
        }
      }
      console.log(userId);
      if(userId != 0){
        this.setAuthenticated(userId);
        this.router.navigateByUrl('companies');
      }
    });
  }

  setAuthenticated(userId: number) {
    localStorage.setItem("userId", userId.toString());
  }

  logout(){
    localStorage.clear();
  }
}
