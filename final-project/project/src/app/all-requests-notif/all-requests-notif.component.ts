import { Component, OnInit } from '@angular/core';
import { RequestService } from '../service/request.service';
import { Request } from '../model/request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-requests-notif',
  templateUrl: './all-requests-notif.component.html',
  styleUrls: ['./all-requests-notif.component.css']
})
export class AllRequestsNotifComponent implements OnInit{
  requests: Request[] = [];

  constructor(private requestService: RequestService, private router: Router) { }

  ngOnInit(): void {
    this.requestService.getRequests().subscribe((data: Request[]) => {
      this.requests = data;
    });
  }
  
}
