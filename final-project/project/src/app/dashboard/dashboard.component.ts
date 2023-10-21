import { Component, OnInit } from '@angular/core';
import { Dog } from '../model/dog';
import { DogService } from '../service/dogservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  dogs: Dog[] = [];
  dog: Dog = new Dog();

  constructor(private dogService: DogService, private router: Router) { }

  ngOnInit(): void {
    this.dogService.getDogs().subscribe((data: Dog[]) => {
      this.dogs = data;
    });
  }

  displayImage(binaryData: Uint8Array): string {
    const blob = new Blob([binaryData], { type: 'jpeg' });
    return URL.createObjectURL(blob);
  }
  
}
