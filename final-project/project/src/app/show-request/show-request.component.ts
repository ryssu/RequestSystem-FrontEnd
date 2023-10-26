import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Request } from '../model/request';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-show-request',
  templateUrl: './show-request.component.html',
  styleUrls: ['./show-request.component.css']
})
export class ShowRequestComponent implements OnInit {
  request: Request = new Request(); 
  showReq: FormGroup;
  
  constructor(private requestService: RequestService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.showReq = this.fb.group({
      reqId: '',
      dogId: '',
      reqName: '',
      reqContact: '',
      reqMessage: ''
    });
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        this.requestService.getRequest(id).subscribe(data => {
          this.request = data; 
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/requests']);
  }
}