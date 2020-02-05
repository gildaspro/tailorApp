import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore  } from '@angular/fire/firestore';
import { Users } from '../../services/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthentificationServiceService } from 'src/app/services/authentification-service.service';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  Address?: string;
  phoneNumber?: string;
  dateDeCreation:any;
  password:any
}
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 private loaderToShow ;
  show ;
  user:User;
  constructor(
              private storeService: AuthserviceService,
              private route: ActivatedRoute,
              private Toastmsg: ToastController,
              private nav: NavController,
              private myservice: AuthentificationServiceService,
              private router: Router,
              public navCtrl: NavController,
              public fAuth: AngularFireAuth,
              public loadingController: LoadingController
              ) {}
  
  // user: Users = {
  // name: '',
  // email: '',
  // Address:'',
  // phoneNumber: '',
  // password: '',
  // dateDeCreation: '',
  // };
  
 client:User = {
  uid: '',
  email: '',
  photoURL: '',
  displayName: '',
  Address:'',
  phoneNumber: '',
  dateDeCreation:'',
  password:'',
}
  email: string;
  password: string;

  erromassage;
  // userId = this.user.id;

  
  // async register() {
  //       this.loadingController.create({
  //         message:'laoding'
  //       }).then((overlay) => {
  //       this.loaderToShow = overlay;
  //       this.loaderToShow.present();
  //       })
  //   try {

  //     const r = await this.fAuth.auth.createUserWithEmailAndPassword(
  //       this.user.email,
  //       this.user.password
  //     );
  //     if (r) {
  //       alert('Successfully registered!');
  //       this.navCtrl.navigateRoot('login');

  //     }

  //     this.loaderToShow.dismiss();

  //   } catch (err) {
  //    this.erromassage = err;

  //   }
  //   this.loaderToShow.dismiss();

  // }

   signUp(user:User){
     this.myservice.SignUp(user.email , user.password).then(() =>{
       console.log('user creater successfully');
       this.navCtrl.navigateRoot('login');

     },err =>{
       console.log(err.message);
        return;
     })
     this.navCtrl.navigateRoot('login');
      return this.show = false;
   }
ngOnInit() {
//  this.userId = this.route.snapshot.paramMap.get('id');
//    if (this.userId) {
//       this.storeService.getClient(this.userId).subscribe(res => {
//         this.user = res;
//       });
//     }

 }




// addclient() { 
//   //  this.register();
//      this.storeService.addClient(this.user).then(() => { 
//      this.router.navigateByUrl('/tabs/clients-list');
//      this.showTaost('New Client Added');
//   }, err => {
//     this.showTaost('There was a problem adding your CLient :(');
//   });

// }

// updateclient() {
//   this.storeService.updateClient(this.user , this.userId).then(() => {
//    this.showTaost('New Client update');
//   }, err => {
//     this.showTaost('There was a problem updating your CLient :(');
//   });
// }

showTaost(msg){
  this.Toastmsg.create({
    message: msg,
    duration: 2000
  }).then(toast => toast.present());

}
onSubmit(form:NgForm) {
  console.log(form.value);
}


}



