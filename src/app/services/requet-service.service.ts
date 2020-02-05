import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface Order {
   id?: string;
   Categorie: string;
   prixUnitaire: string;
   Quantite: string;
   PrixTotal: string;
   Notes: string;
   CustomerRef: string;
   Amount: string;
   Discound: string;
   customerID: string;
   DateDeLivration: any;
   DateDeCreation: any;
   DateDeSupressiont: any;
   totalprice: any;
   position:any;
   status:any ;


   
}
@Injectable({
  providedIn: 'root'
})
export class RequetServiceService {
 open;
  private orderCollection: AngularFirestoreCollection<Order>;
  private orders: Observable<Order[]>;
  private progres:Observable<Order[]>;
  private deliver:Observable<Order[]>;
  private orderCollectionProgress: AngularFirestoreCollection<Order>;
  private  orderCollectionDeliver: AngularFirestoreCollection<Order>;
  uid: any;
   constructor(private db: AngularFirestore) {
  this.uid = JSON.parse(localStorage.getItem('user'));

  this.orderCollectionProgress = this.db.collection("userdata").doc(this.uid).collection<Order> ('Orders',  ref => {
      return ref.orderBy('position', 'desc').where('status', '==', 'progress');
    });
  this.orderCollectionDeliver = this.db.collection("userdata").doc(this.uid).collection<Order> ('Orders',  ref => {
      return ref.orderBy('position', 'desc').where('status', '==', 'deliver');
    });
  this.orderCollection =this.db.collection("userdata").doc(this.uid).collection<Order>('Orders',  ref => {
    return ref.orderBy('position', 'desc').where('status', '==', 'open');
  });

  this.orders = this.orderCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    })
  );

   this.progres = this.orderCollectionProgress.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    })
  );
 
 
  this.deliver =  this.orderCollectionDeliver.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    })
  );
 
 
}


getClients() {
  return this.orders;
}
getprogress(){
  return this.progres;
}
getDeliver(){
  return this.deliver;
}

getClient(id: string) {
  return this.orderCollection.doc<Order>(id).valueChanges().pipe(
      take(1),
      map(order => {
       order.id = id;
       return order;
    })
  );
}
updateClient(order: Order, id: string) {
 return this.orderCollection.doc(id).update(order);
 
}
addClient(order: Order) {
  return this.orderCollection.add(order);
}
removeClient(id: string) {
  return this.orderCollection.doc(id).delete();
}
pro( id: string){
  return this.orderCollectionProgress.doc(id).set({
    status: 'progress'
  }   , { merge: true } )
}
deli(id: string){
  return this.orderCollectionProgress.doc(id).set({
    status: 'deliver'
  }  , { merge: true } )
}
opens(id: string){
  return this.orderCollectionProgress.doc(id).set({
    status: 'open'
  } , { merge: true } )
}

}
