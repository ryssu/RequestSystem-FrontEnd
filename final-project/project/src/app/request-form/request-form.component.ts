import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestService } from '../service/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  newRequest: FormGroup;
  dogFK: number; // Add a property to store the dogId

  constructor(private requestService: RequestService, private fb: FormBuilder, private router: Router) {
    this.newRequest = this.fb.group({
      dogId: '',
      reqName: '',
      reqContact: '',
      reqMessage: '',
    });
  }

  ngOnInit() {
    const storedDogId = localStorage.getItem('dogId');
    if (storedDogId) {
      this.dogFK = parseInt(storedDogId, 10);
      this.newRequest.patchValue({
        dogId: this.dogFK,
      });
    }
  }

  createRequest() {
    if (this.newRequest.valid) {
      this.requestService.createRequest(this.newRequest.value)
        .subscribe(
          (response) => {
            console.log('Request added:', response);
            console.log(this.newRequest.value);
            this.router.navigate(['/user-dashboard']);
          },
          (error) => {
            console.log(this.newRequest.value)
            console.error('Error adding request:', error);
          }
        );
    }
  }

  checkFields(): boolean {
    for (const controlName in this.newRequest.controls) {
      if (this.newRequest.get(controlName).hasError('required')) {
        alert('Please fill out all the required fields.');
        return false;
      }
    }
    this.createRequest();
    return true;
  }
}
