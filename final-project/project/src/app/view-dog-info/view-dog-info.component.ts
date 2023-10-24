import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Dog } from '../model/dog';
import { DogService } from '../service/dogservice';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      name:  ' ',
      photo: new Uint8Array(0),
      breed: ' ',
      age: 0,
      doa: new Date(),
      personality: ' ',
      status: ' '
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
    testData.append('photo', this.selectedFile, this.selectedFile.name);
    testData.append('name', this.dogUpdate.value.name);
    testData.append('breed', this.dogUpdate.value.breed);
    testData.append('age', this.dogUpdate.value.age.toString());
    testData.append('doa', this.dogUpdate.value.doa.toString());
    testData.append('personality', this.dogUpdate.value.personality);
    testData.append('status', this.dogUpdate.value.status);
    this.dogService.updateDog(this.dogID,testData)
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
  executeDeleteFunction(): void {
    this.dogService.deleteDog(this.dogID)
    .subscribe(data => {
      console.log('Country deleted successfully:', data);
      this.router.navigate(['/countries']);
    });
  }


}
