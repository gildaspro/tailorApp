import { Component, OnInit } from '@angular/core';
import { StoreServiceService, Client } from '../../services/store-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.page.html',
  styleUrls: ['./clients-list.page.scss'],
})
export class ClientsListPage implements OnInit {

clientList: Client[];
private loaderToShow;
constructor(private storeService: StoreServiceService,
            private db: AngularFirestore,
            public loadingController: LoadingController
            ) { }

          
            loadData(event) {
              setTimeout(() => {
                console.log('Done');
                event.target.complete();
                if (this.clientList.length == 1000) {
                  event.target.disabled = true;
                }

              }, 1000);
            }

ngOnInit() {
  this.loadItem();
  
}
 remove(id) {
    this.storeService.removeClient(id);
 }
 loadItem() {
  this.loadingController.create({
    message:'laoding'
  }).then((overlay) => {
  this.loaderToShow = overlay;
  this.loaderToShow.present();
  })  
   this.storeService.getClients().subscribe(res => {
   this.loaderToShow.dismiss();
   this.clientList = res ;

 });

 }
 
}
