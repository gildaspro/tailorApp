import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
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
    DateDeCreation: new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(),
    new Date().getUTCDate(), new Date().getUTCHours(), )),
    DateDeSupressiont:  '',
    totalprice: '',
    position: '',

   };
  constructor( private db: AngularFirestore,
               private toastmsg: ToastController,
               private router: Router,
               private route: ActivatedRoute,
               private orderService: RequetServiceService) { }
               clientId = this.orders.id;
               pos = this.orders.position;
               ngOnInit() {
                this.clientId = this.route.snapshot.paramMap.get('id');
                if (this.clientId) {
                     this.orderService.getClient(this.clientId).subscribe(res => {
                     this.orders = res;
                   });
                  }
              }



             addOrder() {
                this.pos = this.orders ? this.orders[0].pos + 1 : 0 ;
                this.orderService.addClient(this.orders).then(() => {
                this.router.navigateByUrl('/tabs/order/open');
                this.showTaost('New order Added');
                this.orders.Categorie = '';
                this.orders.prixUnitaire = '';
                this.orders.Quantite = '';
                this.orders.PrixTotal = '';
                this.orders.Notes = '';
                this.orders.CustomerRef = '';
                this.orders.Amount = '';
                this.orders.Discound = '';
                this.orders.customerID = '';
                this.orders.DateDeLivration = '';
                this.orders.DateDeCreation = new Date().getTime();
                this.orders.DateDeSupressiont = '';
                this.orders.totalprice = '';
               }, err => {
                 this.showTaost('There was a problem adding your CLient :(');
               });
             }

             updateOrder() {
               this.orderService.updateClient(this.orders , this.clientId).then(() => {
                this.showTaost('New Client update');
               }, err => {
                 this.showTaost('There was a problem updating your CLient :(');
               });
             }
             remove() {
              this.orderService.removeClient(this.clientId).then(() => {
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
