import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Dog } from '../model/dog';
import { Account } from '../model/account';
import { DogService } from '../service/dogservice';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view-dog-info',
  templateUrl: './user-view-dog-info.component.html',
  styleUrls: ['./user-view-dog-info.component.css']
})
export class UserViewDogInfoComponent implements OnInit{
  dog: Dog = new Dog();
  account: Account = new Account();
  dogRequest: FormGroup;
  selectedFile : File = null;
  dogID: number;
  uploadedImageUrl: string | ArrayBuffer;
  constructor(private dogService: DogService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.dogRequest = this.fb.group({
      id: '',
      name:  'null',
      photo: new Uint8Array(0),
      breed: '',
      age: 0,
      doa: new Date(),
      personality: '',
      status: '',
      gender: ''
    });
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        this.dogService.getDog(id).subscribe(data => {
          this.dog = data; 
          this.initializeForm();
        });
      }
    });    
  }

  initializeForm(): void {
    this.dogRequest = this.fb.group({
      id: this.dog.id,
      name: this.dog.name,
      photo: this.dog.photo,
      breed: this.dog.breed,
      age: this.dog.age,
      doa: this.dog.doa,
      personality: this.dog.personality,
      status: this.dog.status,
      gender: this.dog.gender
    });
  }

  goBack(): void {
    this.router.navigate(['/user-dashboard']);
  }

  initiateRequest(){
    localStorage.setItem('dogId', this.dog.id.toString());
    //localStorage.setItem('userId', this.account.myId.toString());
    this.router.navigate(['/request-form']);
  }

}
