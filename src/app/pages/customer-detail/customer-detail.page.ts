import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {
  color;
  constructor() { }

  ngOnInit() {
  
this.color = Math.floor(Math.random() * 16777216).toString(16);
return '#000000'.slice(0, -this.color.length) + this.color;
}
}
