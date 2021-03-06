import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Client {

  id?: string;
  contact: string ;
  FullName: string;
  email: string;
  Gender: string;
  Bust: string;
  poinOfBurst: string;
  upperArm: string;
  BackWiidth: string;
  pantsLenght: string;
  sleeeLenght: string;
  Bustseparation: string;
  FrontNeckToWaist: string;
  Thigh: string;
  NeckWidth: string;
  Shoulder: string;
  UNderBurst: string;
  creatAt: any;
  position: any;


}
@Injectable({
  providedIn: 'root'
})
export class StoreServiceService implements OnInit {

  private clientsCollection: AngularFirestoreCollection<Client>;
  private clientsDocumentCollection: AngularFirestoreCollection<Client>
  private clients: Observable<Client[]>;
  id = this.db.createId();
  uid
  constructor(private db: AngularFirestore,
              public fAuth: AngularFireAuth) {
    this.uid = JSON.parse(localStorage.getItem('user'));
    this.clientsCollection = this.db.collection("userdata").doc(this.uid).collection<Client>("clients");
    this.clientsDocumentCollection = this.db.collection("clients");

    //  this.clientsCollection = this.db.collection<Client>("clients" );
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

getsingleClient(id) {
  return this.clientsCollection.doc<Client>(id).valueChanges();
}
updateClient(client: Client, id: string) {
 return this.clientsCollection.doc(id).update(client);
}
addClient(client: Client) {
  return this.clientsCollection.add(client);
}
removeClient(id: string) {
  return this.clientsCollection.doc(id).delete();
}
 ngOnInit() {
}




}
