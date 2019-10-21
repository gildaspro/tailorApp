import { Component, OnInit } from '@angular/core';
import { StoreServiceService, Client } from '../../services/store-service.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.page.html',
  styleUrls: ['./clients-list.page.scss'],
})
export class ClientsListPage implements OnInit {

clientList: Client[];
constructor(private storeService: StoreServiceService,
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
 remove(clients: Client) {
    this.storeService.removeClient(clients.id);
 }
 loadItem() {
    this.storeService.getClients().subscribe(res => {
   this.clientList = res ;
 });
 }
}
