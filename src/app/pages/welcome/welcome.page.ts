import { Component, OnInit } from '@angular/core';
import {  NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {

  constructor(public navCtrl: NavController) { }

  login() {
    this.navCtrl.navigateForward(['/login']);
  }

  signup() {
    this.navCtrl.navigateForward(['/register']);
  }
}
