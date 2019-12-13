import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FcmService } from './fcm.service';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  loaderToShow: Promise<void>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public  loadingController: LoadingController,
    public  toastCtrl: ToastController,
    private fcm: FcmService
   ) {
    this.initializeApp();
    
   }
            

  private async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  private notificationSetup() {
  
  // Get a FCM token
   this.fcm.getToken();
   
  // Listen to incoming messages
 this.fcm.listenToNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
             // show a toast
          this.presentToast(msg.aps.alert);
        } else {
             // show a toast
          this.presentToast(msg.body);
        }
      });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  
}
