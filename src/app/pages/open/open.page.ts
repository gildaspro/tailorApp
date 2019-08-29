import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RequetServiceService, Order } from 'src/app/services/requet-service.service';

@Component({
  selector: 'app-open',
  templateUrl: './open.page.html',
  styleUrls: ['./open.page.scss'],
})
export class OpenPage implements OnInit {
  
OrderList: Order[] ;
  constructor(private db: AngularFirestore, private orderService: RequetServiceService ) {
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

}
