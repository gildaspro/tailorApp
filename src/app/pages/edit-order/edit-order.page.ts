import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, NavController, NavParams, LoadingController, Platform, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { RequetServiceService, Order } from 'src/app/services/requet-service.service';
import {  Client,AppenClientService } from 'src/app/services/appen-client.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

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
               private storeService: AppenClientService,
               private plt: Platform,
               private Notification: LocalNotifications,
               public alertController: AlertController
               ) {
                   
                //  this.plt.ready().then(() =>{
                //     this.Notification.on('click').subscribe(res =>{
                //       let msg = res.data ? res.data.mydata:'' ;
                //       console.log('click', res)
                //      this.showAlert(res.title,res.text,msg)
                //     })
                //     this.Notification.on('trigger').subscribe(res =>{
                //      let msg = res.data ? res.data.mydata:'' ;
                //      console.log('trigger', res)
                //      this.showAlert(res.title,res.text,msg)
                //     })
                //  })


                this. NotificationShedule()

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
          
         NotificationShedule(){
           this.Notification.schedule({
            id: 1,
            title: 'My first notification junior',
            text: 'Thats pretty easy...',
            data: { mydata:'first local notification hope it give '},
            trigger: { in: 5 , unit: ELocalNotificationTriggerUnit.SECOND},
            foreground: true

           })
         }
         
        

            showAlert( title , text ,data){
              this.alertController.create({
                header: title,
                subHeader: text,
                message: data,
                buttons: ['OK']
              }).then( alert => alert.present())

            }
            

             addOrder() {
              this.loadingController.create({
                message:'laoding'
              }).then((overlay) => {
              this.loaderToShow = overlay;
              this.loaderToShow.present();
              })  
            
                this.orderService.addClient(this.orders).then(() => {
                this.showTaost('New order Added');
                this.loaderToShow.dismiss();
                this.rootNavCtrl.navigateForward('/tabs/order');
           

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
               this.showTaost('New Client update');
               this.loaderToShow.dismiss();

               this.rootNavCtrl.navigateForward('/tabs/order');
              }, err => {
                 this.showTaost('There was a problem updating your CLient :(');

               });

             }
             remove() {
              this.loadingController.create({
                message:'laoding'
              }).then((overlay) => {
              this.loaderToShow = overlay;
              this.loaderToShow.present();
              })  
            
              this.orderService.removeClient(this.clientId).then(() => {
                this.loaderToShow.dismiss();
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
