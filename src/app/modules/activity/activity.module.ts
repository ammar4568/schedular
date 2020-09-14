import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity/activity.component';
import { HeaderComponent } from './header/header.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ActivityComponent, HeaderComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    FormsModule
  ]
})
export class ActivityModule { }
