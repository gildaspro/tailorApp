import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, NavController, NavParams, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { RequetServiceService, Order } from 'src/app/services/requet-service.service';
import { Client, StoreServiceService } from 'src/app/services/store-service.service';

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
    status:'open'

   };

  constructor( private db: AngularFirestore,
               private toastmsg: ToastController,
               private   rootNavCtrl: NavController,
               private route: ActivatedRoute,
               private orderService: RequetServiceService,
               public loadingController: LoadingController,
               private storeService: StoreServiceService,
               ) {

                }
               clientId = this.orders.id;
               pos = this.orders.position;
               clientList: Client[];

               totalprice ;
               loaderToShow;
               ngOnInit() {
                this.clientId = this.route.snapshot.paramMap.get('id');
                if (this.clientId) {
                     this.orderService.getClient(this.clientId).subscribe(res => {
                     this.orders = res;
                   });
                  }
                  this.loadItem();
           }



             addOrder() {
              this.loadingController.create({
                message:'laoding'
              }).then((overlay) => {
              this.loaderToShow = overlay;
              this.loaderToShow.present();
              })  
            
                this.orderService.addClient(this.orders).then(() => {
                this.rootNavCtrl.navigateForward('/tabs/order');
                this.showTaost('New order Added');
                this.loaderToShow.dismiss();

              }, err => {
                 this.showTaost('There was a problem adding your CLient :(');

               });
         

             }

             updateOrder() {
              this.loadingController.create({
                message:'laoding'
              }).then((overlay) => {
              this.loaderToShow = overlay;
              this.loaderToShow.present();
              })  
            
               this.orderService.updateClient(this.orders , this.clientId).then(() => {
               this.rootNavCtrl.navigateForward('/tabs/order');

                this.showTaost('New Client update');

               }, err => {
                 this.showTaost('There was a problem updating your CLient :(');

               });
               this.loaderToShow.dismiss();

             }
             remove() {
              this.loadingController.create({
                message:'laoding'
              }).then((overlay) => {
              this.loaderToShow = overlay;
              this.loaderToShow.present();
              })  
            
              this.orderService.removeClient(this.clientId).then(() => {
                this.rootNavCtrl.navigateForward('/tabs/order');
                this.showTaost('Oder deleted succesfully');

               }, err => {
                 this.showTaost('There was a problem updating your CLient :(');

               });
               this.loaderToShow.dismiss();

           }
             showTaost(msg) {
               this.toastmsg.create({
                 message: msg,
                 duration: 2000
               }).then(toast => toast.present());

             }
             loadItem() {
               this.storeService.getClients().subscribe(res => {
                this.clientList = res ;
            
             });
            
             }
        
             loadData(event) {
              setTimeout(() => {
                console.log('Done');
                event.target.complete();
                if (this.clientList.length == 1000) {
                  event.target.disabled = true;
                }

              }, 1000);
            }
}
