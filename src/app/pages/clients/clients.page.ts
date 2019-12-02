import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Clientform } from '../../clientform';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { database } from 'firebase';
import { format } from 'url';
import { StoreServiceService, Client } from '../../services/store-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  NavController, ToastController } from '@ionic/angular';

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
    creatAt: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(),
    new Date().getUTCDate(), new Date().getUTCHours(), ))
};
  constructor(private db: AngularFirestore,
              private storeService: StoreServiceService,
              private route: ActivatedRoute,
              private Toastmsg: ToastController,
              private nav: NavController,
              private router: Router) {}

  pos = this.client.position;
  clientId = this.client.id;
  time = this.client.creatAt;
ngOnInit() {
   this.clientId = this.route.snapshot.paramMap.get('id');
   if (this.clientId) {
      this.storeService.getClient(this.clientId).subscribe(res => {
        this.client = res;
      });
    }
 }

addclient() {
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
