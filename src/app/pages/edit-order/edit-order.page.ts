import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, NavController, NavParams } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { RequetServiceService, Order } from 'src/app/services/requet-service.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.page.html',
  styleUrls: ['./edit-order.page.scss'],
})
export class EditOrderPage implements OnInit {

  orders: Order = {
    Categorie:  '',
    prixUnitaire:  '',
    Quantite:  '',
    PrixTotal:  '',
    Notes:  '',
    CustomerRef:  '',
    Amount:  '',
    Discound:  '',
    customerID:  '',
    DateDeLivration:  '',
    DateDeCreation: '',
    DateDeSupressiont:  '',
    totalprice: '',
    position: '',

   };

  constructor( private db: AngularFirestore,
               private toastmsg: ToastController,
               private   rootNavCtrl: NavController,
               private route: ActivatedRoute,
               private orderService: RequetServiceService) {

                }
               clientId = this.orders.id;
               pos = this.orders.position;
               totalprice ;
               ngOnInit() {
                this.clientId = this.route.snapshot.paramMap.get('id');
                if (this.clientId) {
                     this.orderService.getClient(this.clientId).subscribe(res => {
                     this.orders = res;
                   });
                  }
              }



             addOrder() {
                this.orderService.addClient(this.orders).then(() => {
                  this.rootNavCtrl.navigateForward('/tabs/order');
                this.showTaost('New order Added');
              }, err => {
                 this.showTaost('There was a problem adding your CLient :(');
               });
             }

             updateOrder() {
               this.orderService.updateClient(this.orders , this.clientId).then(() => {
               this.rootNavCtrl.navigateForward('/tabs/order');

                this.showTaost('New Client update');
               }, err => {
                 this.showTaost('There was a problem updating your CLient :(');
               });
             }
             remove() {
              this.orderService.removeClient(this.clientId).then(() => {
                this.rootNavCtrl.navigateForward('/tabs/order');
                this.showTaost('Oder deleted succesfully');
               }, err => {
                 this.showTaost('There was a problem updating your CLient :(');
               });
           }
             showTaost(msg) {
               this.toastmsg.create({
                 message: msg,
                 duration: 2000
               }).then(toast => toast.present());

             }
}
