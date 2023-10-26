import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  newAccount: FormGroup;

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) {
    this.newAccount = this.fb.group({
      firstName: '',
      lastName: '',
      myAddress: '',
      username: '',
      password: '',
    });
  }

  createAccount() {
    if (this.newAccount.valid) {
      this.accountService.createAccount(this.newAccount.value)
        .subscribe(
          (response) => {
            console.log('Account added:', response);
            this.router.navigate(['/login']);
          },
          (error) => {
            console.log(this.newAccount.value)
            console.error('Error adding account:', error);
          }
        );
    }
  }  

  checkPasswordMatch(): void {
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    const confirmPassword = (<HTMLInputElement>document.getElementById('confirmPassword')).value;

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
    } else {
      this.createAccount();
      this.router.navigate(['/login']);
    }
  }
}
