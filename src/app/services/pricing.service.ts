import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Price {

  id?: string;
  name: any;
  price: any;
  dateCreation: any;

}
@Injectable({
  providedIn: 'root'
})
export class PricingService {

  private pricesCollection: AngularFirestoreCollection<Price>;
  private prices: Observable<Price[]>;
  constructor(private db: AngularFirestore) {
  this.pricesCollection = this.db.collection<Price> ('price' );
  
  this.prices = this.pricesCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()as Price;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    })
  );
 }

getClients() {
  return this.prices;
}

getClient(id) {
  return this.pricesCollection.doc<Price>(id).valueChanges();
}
updateClient(client: Price, id: string) {
 return this.pricesCollection.doc(id).update(client);
}
addClient(client: Price) {
  return this.pricesCollection.add(client);
}
removeClient(id) {
  return this.pricesCollection.doc(id).delete();
}
 // tslint:disable-next-line: use-lifecycle-interface
 ngOnInit() {
}

}
