import { Component, OnInit, ViewChild, ElementRef, AbstractType } from '@angular/core';
import { AuthService } from '../usuario/login/auth.service';
import * as moment from 'moment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: ElementRef;

  clicked: boolean;

  master:boolean;
  comercial: boolean;

  constructor(
    private authService: AuthService,
  ) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
  }


  
}
