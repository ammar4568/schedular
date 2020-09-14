import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

import { CalendarModule } from 'primeng/calendar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EventComponent } from './event/event.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    EventComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    CalendarModule,
    NgxChartsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
