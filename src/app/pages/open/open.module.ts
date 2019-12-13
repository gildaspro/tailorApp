import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OpenPage } from './open.page';
import { TestappPage } from '../testapp/testapp.page';
import { TestappPageModule } from '../testapp/testapp.module';

const routes: Routes = [
  {
    path: '',
    component: OpenPage
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    TestappPageModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),

  ],
  declarations: [OpenPage ]
})
export class OpenPageModule {}
