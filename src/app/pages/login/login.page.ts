import { Component, OnInit } from '@angular/core';
import { NavController, } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

export class User {
    email: string;
    password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  public user: User = new User();
  erromassage;

  constructor(public navCtrl: NavController, public fAuth: AngularFireAuth) {
  }


  async login() {
    try {
      const r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log('Successfully logged in!');
        this.navCtrl.navigateRoot('tabs');
      }

    } catch (err) {
     this.erromassage = err;
    }
  }

  ngOnInit() {
  }

}
