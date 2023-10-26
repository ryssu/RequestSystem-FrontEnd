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
  selectedFileName: string; 

  constructor(private dogService: DogService, private fb: FormBuilder, private router: Router) {
    this.newDog = this.fb.group({
      name:  '',
      photo: null,
      breed: '',
      age: 0,
      doa: new Date(),
      personality: '',
      status: '',
      gender: ''
    });
  }
  

  onFileChanged(event){ //May check dito about length ng file something chuchu
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.selectedFileName = this.selectedFile.name;
    }
  }

  onUpload(){
    console.log(this.selectedFile);
    const testData = new FormData();
    testData.append('photo', this.selectedFile);
    testData.append('name', this.newDog.value.name);
    testData.append('breed', this.newDog.value.breed);
    testData.append('age', this.newDog.value.age.toString());
    testData.append('doa', this.newDog.value.doa.toString());
    testData.append('personality', this.newDog.value.personality);
    testData.append('status', this.newDog.value.status);
    testData.append('gender', this.newDog.value.gender);
    this.dogService.addDog(testData)
    .subscribe(
      (data) => {
        console.log('Dog added:', data);
        this.router.navigate(['/dashboard']);
      }
    );    
  }

  checkFields(): boolean {
    for (const controlName in this.newDog.controls) {
      if (this.newDog.get(controlName).hasError('required')) {
        alert('Please fill out all the required fields.');
        return false;
      }
    }
    this.onUpload();
    return true;
  }


}


