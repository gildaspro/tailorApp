import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Price, PricingService } from 'src/app/services/pricing.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.page.html',
  styleUrls: ['./price-list.page.scss'],
})
export class PriceListPage implements OnInit {

 
clientList: Price[];
private loaderToShow;
constructor(private storeService: PricingService,
            private db: AngularFirestore,
            public loadingController: LoadingController
            ) { }

          
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
  this.loadingController.create({
    message:'laoding'
  }).then((overlay) => {
  this.loaderToShow = overlay;
  this.loaderToShow.present();
  }) 
    this.storeService.getClients().subscribe(res => {
   this.clientList = res ; 
   this.loaderToShow.dismiss();

 });

 }
}
