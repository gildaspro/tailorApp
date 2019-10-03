import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Price, PricingService } from 'src/app/services/pricing.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.page.html',
  styleUrls: ['./price-list.page.scss'],
})
export class PriceListPage implements OnInit {

 
clientList: Price[];
constructor(private storeService: PricingService,
            private db: AngularFirestore) { }

          
            loadData(event) {
              setTimeout(() => {
                console.log('Done');
                event.target.complete();
                this.loadItem();
                if (this.clientList.length == 1000) {
                  event.target.disabled = true;
                }
              }, 1000);
            }

ngOnInit() {
  this.loadItem();
  
}
 remove(clients: Price) {
    this.storeService.removeClient(clients.id);
 }
 loadItem() {
    this.storeService.getClients().subscribe(res => {
   this.clientList = res ;
 });
 }
}
