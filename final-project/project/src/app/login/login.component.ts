import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { Account } from '../model/account';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 
})
export class LoginComponent {
  accountCheck: FormGroup;
  account : Account;
  errorMessage: string; 
  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router, private dataService: DataService) {
    this.accountCheck = this.fb.group({
      username: '',
      password: '',
    });
  }

  onSubmit(){
    this.accountService.checkAccount(this.accountCheck.value.username, this.accountCheck.value.password).subscribe(
      (account: Account) => {
        // Handle successful response
        this.account = account;
        if (account && account.role) {
          if (account.role === 'ADMIN') {
            // Redirect to admin dashboard
            this.dataService.setDataPersistent('account', account);
            this.router.navigate(['/dashboard']);
          } else if (account.role === 'USER') {
            // Redirect to user dashboard
            this.dataService.setDataPersistent('account', account);
            this.router.navigate(['/user-dashboard']);
          }
        } else {
          // Handle the case when 'account' is null or 'role' is not defined
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      },
      (error) => {
        // Handle error and set the error message
        console.error('Error: ', error);
        this.errorMessage = 'Login failed. Please check your username and password.';
      }
    );


    }

}
