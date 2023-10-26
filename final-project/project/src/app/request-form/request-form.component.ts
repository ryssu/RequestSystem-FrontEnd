import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestService } from '../service/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent {
  newRequest: FormGroup;

  constructor(private requestService: RequestService, private fb: FormBuilder, private router: Router) {
    this.newRequest = this.fb.group({
      dogId: '',
      reqName: '',
      reqContact: '',
      reqMessage: '',
    });
  }

  createRequest() {
    if (this.newRequest.valid) {
      this.requestService.createRequest(this.newRequest.value)
        .subscribe(
          (response) => {
            console.log('Request added:', response);
            this.router.navigate(['/dashboard']);
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
        alert('Please fill-out all the required fields.');
        return false;
      }
    }
    this.createRequest();
    return true;
  }
}
