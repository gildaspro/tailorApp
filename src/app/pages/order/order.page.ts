import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { OpenPage } from '../open/open.page';
import { DeliverPage } from '../deliver/deliver.page';
import { ProgressPage } from '../progress/progress.page';



@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;

  segment = 0;
  open = OpenPage;
  diliver = DeliverPage;
  progress = ProgressPage;

  
  constructor(
  ) { }

  ngOnInit() {
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

}
