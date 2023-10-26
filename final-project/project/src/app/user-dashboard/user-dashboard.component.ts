import { Component, OnInit } from '@angular/core';
import { Dog } from '../model/dog'; 
import { DogService } from '../service/dogservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit{
  dogs: Dog[] = [];
  isDataLoaded: boolean = false;

  constructor(private dogService: DogService, private router: Router) { }

  ngOnInit(): void {
    this.dogService.getDogs().subscribe((data: Dog[]) => {
      this.dogs = data;
      this.sortDogsAlphabetically();
      this.isDataLoaded = true;
    });
  }

  sortDogsAlphabetically() {
    this.dogs.sort((a, b) => {
      // Use the localeCompare method to compare dog names in a case-insensitive manner
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    });
  }  
}
