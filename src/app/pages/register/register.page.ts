import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';




@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  email: string;
  password: string;
  erromassage;
  constructor(public navCtrl: NavController, public fAuth: AngularFireAuth) {
  }

  async register() {
    try {
      const r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      if (r) {
        alert('Successfully registered!');
        this.navCtrl.navigateRoot('login');
      }

    } catch (err) {
     this.erromassage = err;
    }
  }

  ngOnInit() {
  }

}
