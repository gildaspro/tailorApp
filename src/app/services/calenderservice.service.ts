import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
 export interface Calender{
  title: string,
  desc:  string,
  startTime: any,
  endTime: any,
  allDay:  any,
 }
@Injectable({
  providedIn: 'root'
})
export class CalenderserviceService {

  private calenderCollection: AngularFirestoreCollection<Calender>;
  private events: Observable<Calender[]>;
  constructor(private db: AngularFirestore) { 
    this.calenderCollection = this.db.collection<Calender> ('events' );
    this.events = this.calenderCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data()as Calender;
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }
  getEvents() {
    return this.events;
  }
  getEvent(id) {
    return this.calenderCollection.doc<Calender>(id).valueChanges();
  }
  addEvent(event: Calender) {
    return this.calenderCollection.add(event);
  }
  removeClient(id) {
    return this.calenderCollection.doc(id).delete();
  }
  updateClient(event: Calender, id: string) {
    return this.calenderCollection.doc(id).update(event);
   }
}
