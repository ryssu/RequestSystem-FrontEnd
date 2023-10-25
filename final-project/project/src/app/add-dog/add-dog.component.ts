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
  selectedFile : File;

  constructor(private dogService: DogService, private fb: FormBuilder, private router: Router) {
    this.newDog = this.fb.group({
      name:  '',
      photo: new Uint8Array(0),
      breed: '',
      age: 0,
      doa: new Date(),
      personality: '',
      status: ''
    });
  }
  

  onFileChanged(event){ //May check dito about length ng file something chuchu
    this.selectedFile = event.target.files[0];
  }

  onUpload(){
    console.log(this.selectedFile);
    const testData = new FormData();
    testData.append('photo', this.selectedFile, this.selectedFile.name);
    testData.append('name', this.newDog.value.name);
    testData.append('breed', this.newDog.value.breed);
    testData.append('age', this.newDog.value.age.toString());
    testData.append('doa', this.newDog.value.doa.toString());
    testData.append('personality', this.newDog.value.personality);
    testData.append('status', this.newDog.value.status);
    this.dogService.addDog(testData)
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


