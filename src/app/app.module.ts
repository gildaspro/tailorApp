import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { NgCalendarModule  } from 'ionic2-calendar';
import { StoreServiceService } from './services/store-service.service';
import { Clientform } from './clientform';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequetServiceService } from './services/requet-service.service';
import { TabsPageModule } from './tabs/tabs.module';
import { CalendarPageModule } from './pages/calendar/calendar.module';

import { OpenPageModule } from './pages/open/open.module';
import { DeliverPageModule } from './pages/deliver/deliver.module';
import { ProgressPageModule } from './pages/progress/progress.module';
import { OrderPageModule } from './pages/order/order.module';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './fcm.service';
import { TestappPageModule } from './pages/testapp/testapp.module';








@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    TabsPageModule,
    OpenPageModule,
    DeliverPageModule,
    ProgressPageModule,
    CalendarPageModule,
    OrderPageModule,
    TestappPageModule,

    



  ],
    providers: [   
    Firebase,
    StatusBar,
    Clientform,
    StoreServiceService,
    RequetServiceService,
    FcmService,
    SplashScreen,
   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
   
],
  bootstrap: [AppComponent]
})
export class AppModule {}
