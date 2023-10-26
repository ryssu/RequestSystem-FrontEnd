import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { Account } from '../model/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  accountCheck: FormGroup;
  account : Account;
  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) {
    this.accountCheck = this.fb.group({
      username: '',
      password: '',
    });
  }

  onSubmit(){
    this.accountService.checkAccount(this.accountCheck.value.username, this.accountCheck.value.password).subscribe(
      (account : Account) => {
        // Handle successful response
        this.account = account;
        if (account.role === 'ADMIN') {
          // Redirect to admin dashboard
          this.router.navigate(['/dashboard']);
        } else if (account.role === 'USER') {
          // Redirect to user dashboard
          this.router.navigate(['/user-dashboard']);
        }
        //this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Handle error
        console.error('Error creating country:', error);
      }
    );


    }

}
