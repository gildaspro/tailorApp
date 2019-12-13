
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { RequetServiceService, Order } from './services/requet-service.service';


@Injectable({
  providedIn: 'root'
})
export class FcmService {
  orders: Order = {
    Categorie:  '',
    prixUnitaire:  '',
    Quantite:  '',
    PrixTotal:  '',
    Notes:  '',
    CustomerRef:  '',
    Amount:  '',
    Discound:  '',
    customerID:  '',
    DateDeLivration:  '',
    DateDeCreation: '',
    DateDeSupressiont:  '',
    totalprice: '',
    position: '',
    status:'open'

   };

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
    private orderService: RequetServiceService,

  ) {}
  private orderCollection: AngularFirestoreCollection;


  // Get permission from the user
  async getToken() { 
    let token;

      if (this.platform.is('android')) {
        token = await this.firebaseNative.getToken()
      } 

      if (this.platform.is('ios')) {
        token = await this.firebaseNative.getToken();
        await this.firebaseNative.grantPermission();
      } 
  
  return this.saveTokenToFirestore(token)
    

  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if (!token) return;
  
     this.orderCollection= this.afs.collection('Orders')
    const docData = { 
      token,
      userId: 'testUser',
    }
  
    return this.orderCollection.doc(token).set(docData)
  }
  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()

  }

}
