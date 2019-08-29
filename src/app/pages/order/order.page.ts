import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { OpenPage } from '../open/open.page';
import { DeliverPage } from '../deliver/deliver.page';
import { ProgressPage } from '../progress/progress.page';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage  {
  segment = 0;
  open = OpenPage;
  progress = ProgressPage;
  deliver = DeliverPage;
  constructor() {}
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    
  }
}
