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
        }, 10000);
      }
    ngOnInit() {
     this.loadItem();
     
    }
    
    
    
  loadItem( ) {
     this.orderService.getClients().subscribe(res => {
        this.OrderList = res;
      });
  }


    l(){
      this.orderService.getClients().subscribe(res => {
        this.OrderList = res;
      });
    }
}
