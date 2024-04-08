import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Account } from '../model/account';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

constructor(private router: Router, private dataService: DataService) { }

account : Account;

  navigateToHome(){
    this.account = this.dataService.getDataPersistent('account');
    if (this.account == null) {
      this.router.navigate(['index']);
    } else if (this.account.role.roleName === "ADMIN"){
      this.router.navigate(['/dashboard']);
    } else if (this.account.role.roleName === "USER"){
      this.router.navigate(['/user-dashboard']);
    }
  }

}
