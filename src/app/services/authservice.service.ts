import { Injectable, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
export interface Users{

 
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

  private clientsCollection: AngularFirestoreCollection<Users>;
  private clients: Observable<Users[]>;
  authState: string;
  constructor(private db: AngularFirestore,
               public fAuth: AngularFireAuth,
    ) {
   this.getCurrenUser()

  this.clientsCollection = this.db.collection<Users> ('users' );
  
  this.clients = this.clientsCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()as Users;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    })
  );
 }
 getCurrenUser(){
  this.fAuth.authState.subscribe((auth) => {
    this.authState = auth.uid
    localStorage.setItem('user', JSON.stringify(this.authState));
    console.log(JSON.parse(localStorage.getItem('user')))

   console.log(this.authState)
  });
}
getClients() {
  return this.clients;
}
getClient(id) {
  return this.clientsCollection.doc<Users>(id).valueChanges();
}
updateClient(client: Users, id: string) {
 return this.clientsCollection.doc(id).update(client);
}
addClient(client: Users) {
  return this.clientsCollection.add(client);
}
removeClient(id) {
  return this.clientsCollection.doc(id).delete();
}
 ngOnInit() {
}




}


