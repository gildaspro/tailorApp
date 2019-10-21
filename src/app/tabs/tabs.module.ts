import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { CalendarPageModule } from '../pages/calendar/calendar.module';
import { OpenPageModule } from '../pages/open/open.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarPageModule,
    OpenPageModule,
    IonicModule,


    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
