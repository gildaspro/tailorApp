import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Clientform } from '../../clientform';
import { FormGroup , FormBuilder , Validators, NgForm} from '@angular/forms';
import { database } from 'firebase';
import { format } from 'url';
import { StoreServiceService, Client } from '../../services/store-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  NavController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment'; // add this 1 of 4

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit  {
  client: Client = {
    contact: '',
    FullName: '',
    email: '',
    Gender: '',
    Bust: '',
    poinOfBurst: '',
    upperArm: '',
    BackWiidth: '',
    pantsLenght: '',
    sleeeLenght: '',
    Bustseparation: '',
    FrontNeckToWaist: '',
    Thigh: '',
    NeckWidth: '',
    Shoulder: '',
    UNderBurst: '',
    position: '',
    creatAt: new Date().toISOString().slice(0,10)
};
  constructor(private db: AngularFirestore,
              private storeService: StoreServiceService,
              private route: ActivatedRoute,
              private Toastmsg: ToastController,
              private nav: NavController,
              private router: Router,
              public loadingController: LoadingController,
              ) {
                 this.now = moment(); // add this 2 of 4
                }

  pos = this.client.position;
  clientId = this.client.id;
  time = this.client.creatAt;
  now
  loaderToShow;
ngOnInit() {
   this.clientId = this.route.snapshot.paramMap.get('id');
   if (this.clientId) {
      this.storeService.getsingleClient(this.clientId).subscribe(res => {
        this.client = res;
      });
    }
 }

addclient() {
  this.loadingController.create({
    message:'laoding ...'
  }).then((overlay) => {
  this.loaderToShow = overlay;
  this.loaderToShow.present();
  })  

  this.storeService.addClient(this.client).then(() => {
  this.router.navigateByUrl('/tabs/clients-list');
  this.loaderToShow.dismiss();
  this.showTaost('New Client Added');

  }, err => {
    this.showTaost('There was a problem adding your CLient :(');

  });

}

updateclient() {
  this.loadingController.create({
    message:'laoding'
  }).then((overlay) => {
  this.loaderToShow = overlay;
  this.loaderToShow.present();
  })  

  this.storeService.updateClient(this.client , this.clientId).then(() => {
  this.showTaost('New Client update');
  this.loaderToShow.dismiss();

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
onSubmit(form:NgForm) {
  console.log(form.value);
}
}
