import { Injectable, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
export interface Client {

 
  id?: string;
  name: string;
  email: string;
  Address:string;
  phoneNumber: any;
  password: string;
  dateDeCreation: string;



}
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService implements OnInit {

  private clientsCollection: AngularFirestoreCollection<Client>;
  private clients: Observable<Client[]>;
  constructor(private db: AngularFirestore) {
  this.clientsCollection = this.db.collection<Client> ('clients' );
  
  this.clients = this.clientsCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()as Client;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    })
  );
 }

getClients() {
  return this.clients;
}

getClient(id) {
  return this.clientsCollection.doc<Client>(id).valueChanges();
}
updateClient(client: Client, id: string) {
 return this.clientsCollection.doc(id).update(client);
}
addClient(client: Client) {
  return this.clientsCollection.add(client);
}
removeClient(id) {
  return this.clientsCollection.doc(id).delete();
}
 ngOnInit() {
}




}


