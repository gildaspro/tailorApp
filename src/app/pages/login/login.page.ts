import { Component, OnInit } from '@angular/core';
import { NavController, } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthentificationServiceService } from 'src/app/services/authentification-service.service';

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

  loaderToShow;
  show :boolean = false;
  public user: User = new User();
  erromassage;
  isSubmitted = false;
  form: FormGroup;
  authState: any;
  authenticated: any;
  uid
  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder, 
              public fAuth: AngularFireAuth,
              public myService: AuthentificationServiceService,
              public loadingController: LoadingController
              ) {
                
  }

  getCurrenUser(){
    this.fAuth.authState.subscribe((auth) => {
      this.authState = auth.uid
      localStorage.setItem('user', JSON.stringify(this.authState));
      console.log(JSON.parse(localStorage.getItem('user')))

     console.log(this.authState)
    });
  }


  login(user:User){

    this.myService.SignIn(user.email, user.password).then( () => {
     this.navCtrl.navigateRoot('tabs');
          
     console.log('well done')
     console.log(JSON.parse(localStorage.getItem('user')));         
 
    }, err => {
      this.erromassage = err;
      alert(this.erromassage);
      

    })

     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))
  }



//   async login() {  
//           this.loadingController.create({
//             message:'laoding'
//           }).then((overlay) => {
//           this.loaderToShow = overlay;
//           this.loaderToShow.present();

//           })       
//  try  {
//         const r = await this.fAuth.auth.signInWithEmailAndPassword (
//         this.user.email,
//         this.user.password

//       );

//       if (r) {
//         console.log('Successfully logged in!');
//         this.navCtrl.navigateRoot('tabs');
//       }

//     } catch (err) {
//      this.erromassage = err;
//      alert(this.erromassage);
//     }     
//      this.loaderToShow.dismiss();
//      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))


//   }

  ngOnInit() {
  //  this.registerForm = this.formBuilder.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  // },);
  }

  // get f() { return this.registerForm.controls; }

  // onSubmit() {
  //     this.submitted = true;
  //     // stop here if form is invalid
  //     if (this.registerForm.invalid) {
  //         return;
  //     }
  //    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  // }
  // noSubmit(e) {
  //   e.preventDefault();
  // }
  async loadingctr() {
    this.loaderToShow = await this.loadingController.create({
      message:'laoding ....' ,
    });
   this.loaderToShow.present() 
   if(this.show == false){
    this.loaderToShow.dismiss() 
   }
  }
 
 
  onSubmit(form:NgForm) {
    console.log(form.value);
  }
  
  
  
//   logout() {
//     return this.fAuth.auth.signOut().then(() => {
//       this.navCtrl.navigateRoot('welcome');
//     }, err =>{
//       console.log(err)
//     });
//  }
}
