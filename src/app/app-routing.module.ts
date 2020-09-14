import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'activity',
    component: LayoutComponent,
    loadChildren: './modules/activity/activity.module#ActivityModule'
  },
  {
    path: 'calendar',
    component: LayoutComponent,
    loadChildren: './modules/calendar/calendar.module#CalendarModule'
  },
  {
    path: 'setup',
    component: LayoutComponent,
    loadChildren: './modules/templates/templates.module#TemplatesModule'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
