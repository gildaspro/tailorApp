import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RequetServiceService, Order } from 'src/app/services/requet-service.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {

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


  progress =this.orders.status;
  navCtl: NavController;
  OrderList: Order[] ;
    constructor(private db: AngularFirestore, 
                private orderService: RequetServiceService,  ) {
      }
      goOrder(){
        this.navCtl.navigateRoot('open/edit-order');
      }
      
  
      loadData(event) {
        setTimeout(() => {
          console.log('Done');
          event.target.complete();
          this.loadItem();
          if (this.OrderList.length == 1000) {
            event.target.disabled = true;
          }
        }, 10000);
      }
    ngOnInit() {
      this.statusProgress()
     
    }
    
    
    
  loadItem( ) {
     this.orderService.getClients().subscribe(res => {
        this.OrderList = res;
      });
  }
  deli(orders: Order){
    this.orderService.deli(orders.id)
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
