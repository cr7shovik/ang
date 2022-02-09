import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSubmitted = false;
  loginForm : FormGroup;


  constructor(private authService : AuthService) { this.loginForm = new FormGroup({
    'email': new FormControl("",[Validators.email,Validators.required]),
    'password' : new FormControl("",[Validators.required])
  })}

  ngOnInit(): void {
  }

  onSubmit(){
    this.isSubmitted= true;
    this.authService.validate(this.loginForm.get("email")?.value,this.loginForm.get("password")?.value);
   
  }

}
