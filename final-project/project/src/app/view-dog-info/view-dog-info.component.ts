import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Dog } from '../model/dog';
import { DogService } from '../service/dogservice';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-dog-info',
  templateUrl: './view-dog-info.component.html',
  styleUrls: ['./view-dog-info.component.css']
})
export class ViewDogInfoComponent implements OnInit {
  dog: Dog = new Dog(); // You can provide default values here
  dogUpdate: FormGroup;
  selectedFile : File;
  dogID: number;
  constructor(private dogService: DogService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.dogUpdate = this.fb.group({
      id: '',
      name:  'null',
      photo: new Uint8Array(0),
      breed: '',
      age: 0,
      doa: new Date(),
      personality: '',
      status: ''
    });
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        this.dogService.getDog(id).subscribe(data => {
          this.dog = data; // Populate the dog object with data from the API
          this.initializeForm();
        });
      }
    });
  }

  initializeForm(): void {
    this.dogUpdate = this.fb.group({
      id: this.dog.id,
      name: this.dog.name,
      photo: this.dog.photo,
      breed: this.dog.breed,
      age: this.dog.age,
      doa: this.dog.doa,
      personality: this.dog.personality,
      status: this.dog.status
    });
  }

  onFileChanged(event){
    this.selectedFile = event.target.files[0];
  }

  onUpload(){
    console.log(this.selectedFile);
    const testData = new FormData();
    testData.append('id', this.dogUpdate.value.id);
    testData.append('photo', this.selectedFile);
    testData.append('name', this.dogUpdate.value.name);
    testData.append('breed', this.dogUpdate.value.breed);
    testData.append('age', this.dogUpdate.value.age);
    testData.append('doa', this.dogUpdate.value.doa);
    testData.append('personality', this.dogUpdate.value.personality);
    testData.append('status', this.dogUpdate.value.status);
    console.log(testData.get('id'));
    console.log(testData.get('name'));
    console.log(testData.get('breed'));
    console.log(testData.get('age'));
    console.log(testData.get('doa'));
    this.dogService.updateDog(this.dogUpdate.value.id,testData)
    .subscribe(
      (response) => {
        console.log('Dog updated:', response);
        console.log(testData);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error adding dog:', error);
        console.log(testData);
      }
    );    
  }
  
  executeDeleteFunction(): void {
    this.dogService.deleteDog(this.dogUpdate.value.id)
    .subscribe(
      (response) => {
        console.log('Dog updated:', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error adding dog:', error);
      }
    );
  }


}
