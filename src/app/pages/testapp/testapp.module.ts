import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TestappPage } from './testapp.page';
import { DatePickerModule } from 'ionic4-date-picker';

const routes: Routes = [
  {
    path: '',
    component: TestappPage,

  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TestappPage]
})
export class TestappPageModule {}
