import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {LoginModel, LoginInterface} from '../../models/login.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    
    loginData: LoginInterface;
    constructor(private userService: UserService, private router: Router) {
        this.userTypeFormControl.setValue('customer');
        this.userTypeFormControl.setValue('dealer');

    }
  

    userTypeFormControl = new FormControl('', null);

    usernameFormControl = new FormControl('', [
        Validators.required,Validators.minLength(12),Validators.maxLength(12)
    ]);

    passwordFormControl = new FormControl('', [
        Validators.required , Validators.minLength(5), Validators.maxLength(8)
       
    ]);

    matcher = new MyErrorStateMatcher();

    login() {
        if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
            this.loginData = new LoginModel();
            this.loginData.username = this.usernameFormControl.value;
            this.loginData.password = this.passwordFormControl.value;
            this.loginData.userType = this.userTypeFormControl.value;
            this.userService.login(this.loginData);
            
        
        }
        else{
          alert( "invalid credentials");
        }
       

        
    }

    register() {
        if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
            this.loginData = new LoginModel();
            this.loginData.username = this.usernameFormControl.value;
            this.loginData.password = this.passwordFormControl.value;
            this.loginData.userType = this.userTypeFormControl.value;
            this.userService.login(this.loginData, true);
        }
        else{
       alert( "invalid credentials");}
       
      
       
        
    }
    
    

    newUser() {
        this.router.navigateByUrl('/register');
    }
}
