import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DogService } from '../service/dogservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dog',
  templateUrl: './add-dog.component.html',
  styleUrls: ['./add-dog.component.css']
})
export class AddDogComponent {
  newDog: FormGroup;

  constructor(private dogService: DogService, private fb: FormBuilder, private router: Router) {
    this.newDog = this.fb.group({
      name:  ' ',
      breed: ' ',
      status: ' ',
      photo: new Uint8Array(0),
      age: 0,
      doa: new Date(),
      personality: ' '
    });
  }
  

  addDog() {
    if (this.newDog.valid) {
      this.dogService.addDog(this.newDog.value)
        .subscribe(
          (response) => {
            console.log('Dog added:', response);
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.error('Error adding dog:', error);
          }
        );
    }
  }  
}
