import { Component, OnInit } from '@angular/core';
import { StoreServiceService } from 'src/app/services/store-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-testapp',
  templateUrl: './testapp.page.html',
  styleUrls: ['./testapp.page.scss'],
})

export class TestappPage implements OnInit {



  constructor(private storeService: StoreServiceService,
              private router: Router,
              
            ) { }


  ngOnInit() {
  }

}
