import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore  } from '@angular/fire/firestore';
import { Client } from '../../services/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 private loaderToShow ;
  show = false;
  constructor(
              private storeService: AuthserviceService,
              private route: ActivatedRoute,
              private Toastmsg: ToastController,
              private nav: NavController,
              private router: Router,
              public navCtrl: NavController,
              public fAuth: AngularFireAuth,
              public loadingController: LoadingController
              ) {}
  
  client: Client = {
  name: '',
  email: '',
  Address:'',
  phoneNumber: '',
  password: '',
  dateDeCreation: '',
  };
  email: string;
  password: string;

  erromassage;

  
  clientId = this.client.id;


  async register() {
        this.loadingController.create({
          message:'laoding'
        }).then((overlay) => {
        this.loaderToShow = overlay;
        this.loaderToShow.present();
        })
    try {

      const r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.client.email,
        this.client.password
      );
      if (r) {
        alert('Successfully registered!');
        this.navCtrl.navigateRoot('login');

      }

      
    } catch (err) {
     this.erromassage = err;

    }
    this.loaderToShow.dismiss();

  }
ngOnInit() {
 this.clientId = this.route.snapshot.paramMap.get('id');
   if (this.clientId) {
      this.storeService.getClient(this.clientId).subscribe(res => {
        this.client = res;
      });
    }
 }

addclient() { 
  
     this.register();
     this.storeService.addClient(this.client).then(() => { 
     this.router.navigateByUrl('/tabs/clients-list');
     this.showTaost('New Client Added');
  }, err => {
    this.showTaost('There was a problem adding your CLient :(');
  });

}

updateclient() {
  this.storeService.updateClient(this.client , this.clientId).then(() => {
   this.showTaost('New Client update');
  }, err => {
    this.showTaost('There was a problem updating your CLient :(');
  });
}

showTaost(msg){
  this.Toastmsg.create({
    message: msg,
    duration: 2000
  }).then(toast => toast.present());

}
 
}



