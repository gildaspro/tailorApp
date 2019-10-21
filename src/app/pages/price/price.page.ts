import { Component, OnInit } from '@angular/core';
import { Price, PricingService } from 'src/app/services/pricing.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-price',
  templateUrl: './price.page.html',
  styleUrls: ['./price.page.scss'],
})
export class PricePage implements OnInit {

  client: Price = {
     name: '',
    price: '',
    dateCreation: new Date().getTime(),
};
  constructor(private db: AngularFirestore,
              private storeService: PricingService ,
              private route: ActivatedRoute,
              private Toastmsg: ToastController,
              private nav: NavController,
              private router: Router) {}

 
  clientId = this.client.id;
 
ngOnInit() {
   this.clientId = this.route.snapshot.paramMap.get('id');
   if (this.clientId) {
      this.storeService.getClient(this.clientId).subscribe(res => {
        this.client = res;
      });
    }
 }

addclient() {
  this.storeService.addClient(this.client).then(() => {
   this.router.navigateByUrl('/tabs/price-list');
   this.showTaost('New Client Added');
  }, err => {
    this.showTaost('There was a problem adding your CLient :(');
  });
}

updateclient() {
  this.storeService.updateClient(this.client , this.clientId).then(() => {
   this.showTaost('New Client update');
  }, err => {
    this.showTaost('There was a problem updating your CLient :(');
  });
}

showTaost(msg)  {
  this.Toastmsg.create({
    message: msg,
    duration: 2000
  }).then(toast => toast.present());

}
}
