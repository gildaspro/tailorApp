import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RequetServiceService, Order } from 'src/app/services/requet-service.service';
import { NavController } from '@ionic/angular';
import { EditOrderPage } from '../edit-order/edit-order.page';

@Component({
  selector: 'app-open',
  templateUrl: './open.page.html',
  styleUrls: ['./open.page.scss'],
})
export class OpenPage implements OnInit {
  navCtl: NavController;
OrderList: Order[] ;
  constructor(private db: AngularFirestore, private orderService: RequetServiceService,  ) {
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
      }, 1000);
    }
  ngOnInit() {
   this.loadItem();
   
  }
  remove(orders: Order) {
    this.orderService .removeClient(orders.id);
 }
loadItem( ) {
   this.orderService.getClients().subscribe(res => {
      this.OrderList = res;
    });
}
}
