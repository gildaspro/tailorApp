import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, PopoverController } from '@ionic/angular';
import { EditOrderPage } from '../edit-order/edit-order.page';
import { TestappPage } from '../testapp/testapp.page';
import { RequetServiceService, Order } from 'src/app/services/requet-service.service';
import { map } from 'rxjs/operators';
import { resolve } from 'url';


@Component({
  selector: 'app-open',
  templateUrl: './open.page.html',
  styleUrls: ['./open.page.scss'],
})
export class OpenPage implements OnInit {
 
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
    status:'',

   };




  navCtl: NavController;
  OrderList: Order[] ;
  progress =this.orders.status;
  orderId=this.orders.id

  constructor(private db: AngularFirestore, 
              private orderService: RequetServiceService,
              public popoverController: PopoverController  ) {
    }
    goOrder(){
      this.navCtl.navigateRoot('open/edit-order');
    }
    async presentPopover(ev: any) {
      const popover = await this.popoverController.create({
        component: TestappPage,
        event: ev,
      });
      return await popover.present();
    }

    loadData(event) {
      setTimeout(() => {
        console.log('Done');
        event.target.complete();
        this.loadItem();
        if (this.OrderList.length == 1000) {
          event.target.disabled = true;
        }
      }, 1000);
    }
  ngOnInit() {
   this.loadItem();
  //  this.statusProgress()
  // this.statusDeliver() 
  }
 
  remove(orders: Order) {
    this.orderService .removeClient(orders.id);
  }
   pro(orders: Order){
     this.orderService.pro(orders.id).then( value => {
      console.log(value); // "Succès!"
    }).catch(function(e) {
      console.log(e); // "zut !"
    });

   }
  open(orders: Order){
    this.orderService.opens(orders.id)
  }
  deli(orders: Order){
    this.orderService.deli(orders.id)
  }
   loadItem( ) {
      this.progress = 'open';
      this.orderService.getClients().subscribe(res => {
      this.OrderList = res;
    });
}

  statusProgress() {
    this.progress = 'progress';
     this.orderService.getprogress().subscribe( res => {
      this.OrderList = res
    }
  )
 }
 
  statusDeliver() {
  this.progress = 'deliver';
  this.orderService.getDeliver().subscribe( res => {
  this.OrderList = res
    }
   )
 }
 
}
