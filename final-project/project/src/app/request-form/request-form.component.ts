import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestService } from '../service/request.service';
import { Router } from '@angular/router';
import { Dog } from '../model/dog';
import { DogService } from '../service/dogservice';
import { Account } from '../model/account';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  newRequest: FormGroup;
  dogFK: number; 
  userFK: number;
  user: Account;
  dog : Dog;

  constructor(private requestService: RequestService, private fb: FormBuilder, private router: Router, private dogService : DogService, private accountService : AccountService) {
    this.newRequest = this.fb.group({
      dogId: 0,
      userId: '',
      reqName: '',
      reqContact: '',
      reqMessage: '',
      status: ''
    });
  }

  ngOnInit() {
    const storedDogId = localStorage.getItem('dogId');
    if (storedDogId) {
      this.dogFK = parseInt(storedDogId, 10);
      this.newRequest.patchValue({
        dogId: this.dogFK,
      });
      this.dogService.getDog(this.dogFK).subscribe(data => {
        this.dog = data;
      })
    }

    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userFK = parseInt(storedUserId, 10);
      this.newRequest.patchValue({
        userId: this.userFK,
      });
      this.accountService.getAccount(this.userFK).subscribe(data => {
        this.user = data;
      });
    } else {
      console.error('userId is not found in local storage or is invalid.');
      // Handle this error case gracefully, e.g., redirect to a login page or display an error message.
    }

  }

  createRequest(){
    const requestData = new FormData();
    requestData.append('name', this.newRequest.value.reqName);
    requestData.append('contact', this.newRequest.value.reqContact);
    requestData.append('message', this.newRequest.value.reqMessage);
    requestData.append('dogId', this.dogFK.toString());
    requestData.append('userId', localStorage.getItem('userId'));
    requestData.append('status', this.newRequest.value.status);

    this.requestService.createRequest(requestData)
    .subscribe(
      (response) => {
        console.log('Request added:', response);
        console.log(requestData);
        console.log(this.dogFK);
        this.router.navigate(['/user-dashboard']);
      },
      (error) => {
        console.log(requestData)
        console.log(this.dogFK);
        console.error('Error adding request:', error);
      }
    );

  }

  checkFields(): boolean {
    for (const controlName in this.newRequest.controls) {
      if (this.newRequest.get(controlName).hasError('required')) {
        alert('Please fill out all the required fields.');
        return false;
      }
    }
    this.newRequest.patchValue({ status: 'FOR REVIEW' });
    this.createRequest();
    return true;
  }
}
