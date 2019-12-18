import { Component, OnInit } from '@angular/core';
import { Price, PricingService } from 'src/app/services/pricing.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

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
              private router: Router,
              public loadingController: LoadingController
              ) {}

 
  clientId = this.client.id;
  private loaderToShow;
 
ngOnInit() {
   this.clientId = this.route.snapshot.paramMap.get('id');
   if (this.clientId) {
      this.storeService.getClient(this.clientId).subscribe(res => {
        this.client = res;
      });
    }
 }

addclient() {
  this.loadingController.create({
    message:'laoding'
  }).then((overlay) => {
  this.loaderToShow = overlay;
  this.loaderToShow.present();
  })  

  this.storeService.addClient(this.client).then(() => {
   this.router.navigateByUrl('/tabs/price-list');
   this.showTaost('New Client Added');
   this.loaderToShow.dismiss();

  }, err => {
    this.showTaost('There was a problem adding your CLient :(');
  });
}

updateclient() {
  this.loadingController.create({
    message:'laoding'
  }).then((overlay) => {
  this.loaderToShow = overlay;
  this.loaderToShow.present();
  })  

  this.storeService.updateClient(this.client , this.clientId).then(() => {
   this.showTaost('New Client update');
   this.loaderToShow.dismiss();

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
onSubmit(form:NgForm) {
  console.log(form.value);
}
}
