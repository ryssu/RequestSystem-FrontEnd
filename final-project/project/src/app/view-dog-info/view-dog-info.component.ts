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

  constructor(
    private route: ActivatedRoute,
    private dogService: DogService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        this.dogService.getDog(id).subscribe(data => {
          this.dog = data; // Populate the dog object with data from the API
        });
      }
    });
  }
}
