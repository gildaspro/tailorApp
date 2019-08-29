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
   position: any;
}
@Injectable({
  providedIn: 'root'
})
export class RequetServiceService {

  private orderCollection: AngularFirestoreCollection<Order>;
  private orders: Observable<Order[]>;
  constructor(private db: AngularFirestore) {
  this.orderCollection = this.db.collection<Order> ('Orders',  ref => {
    return ref.orderBy('position', 'desc');
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
 }

 getClients() {
  return this.orders;
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
inProgress( order) {
this.move(order, 'progress');
}
Delivre(order) {
  this.move(order, 'deliver');
}
move( order: Order , path: string) {
  this.orderCollection.doc(order.id).delete();
  const id = order.id;
  delete order.id;
  this.db.collection('progress',  ref => {
    return ref.orderBy('position', 'desc').limit(1);
  }).get().toPromise().then(actions => {
    order.position = 0;
    actions.forEach(a => {
      order.position = a.data().position = 1 ;
    });
    return this.orderCollection.doc('${path}/${id}').set(order);
  });

}
}
