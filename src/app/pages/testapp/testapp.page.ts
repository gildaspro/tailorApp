import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RequetServiceService, Order } from 'src/app/services/requet-service.service';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-testapp',
  templateUrl: './testapp.page.html',
  styleUrls: ['./testapp.page.scss'],
})

export class TestappPage implements OnInit {
  OrderList: Order[] ;
  constructor(private db: AngularFirestore, 
              private orderService: RequetServiceService,
              public popoverController: PopoverController 
              ) { }

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
            goprogress(){
            }
            remove(orders: Order) {
              this.orderService .removeClient(orders.id);
           }
          loadItem( ) {
             this.orderService.getClients().subscribe(res => {
                this.OrderList = res;
              });
          }
          close(){
            this.popoverController.dismiss();
          }
}
