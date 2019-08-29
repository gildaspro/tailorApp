import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { OrderPage } from './pages/order/order.page';



const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'testapp', loadChildren: './pages/testapp/testapp.module#TestappPageModule' },
  { path: 'customer-detail', loadChildren: './pages/customer-detail/customer-detail.module#CustomerDetailPageModule' },
   {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'order',
        children: [
          {
            path: '',
            loadChildren:  './pages/order/order.module#OrderPageModule'
          }
        ]
      },
 
       {
          path: 'settings',
          children: [
            {
              path: '',
              loadChildren:  './pages/setting/setting.module#SettingPageModule'
            }
          ]
        },

        {
          path: 'calendar',
          children: [
            {
              path: '',
              loadChildren:   './pages/calendar/calendar.module#CalendarPageModule'
            }
          ]
        },
        {
          path: 'clients',
          children: [
            {
              path: '',
              loadChildren:   './pages/clients/clients.module#ClientsPageModule'
            }
          ]
        },
        {
          path: 'clients/:id',
          children: [
            {
              path: '',
              loadChildren:   './pages/clients/clients.module#ClientsPageModule'
            }
          ]
        },
        {
          path: 'clients-list',
          children: [
            {
              path: '',
              loadChildren:   './pages/clients-list/clients-list.module#ClientsListPageModule'
            }
          ]
        },

        {
          path: 'edit-order',
          children: [
            {
              path: '',
              loadChildren:  './pages/edit-order/edit-order.module#EditOrderPageModule'
            }
          ]
        },
        {
          path: 'edit-order/:id',
          children: [
            {
              path: '',
              loadChildren:  './pages/edit-order/edit-order.module#EditOrderPageModule'
            }
          ]
        },
       
        {
          path: '',
          redirectTo: 'calendar',
          pathMatch: 'full'
        }
      ]

    },
    
];
// tslint:disable-next-line: no-unused-expression

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
