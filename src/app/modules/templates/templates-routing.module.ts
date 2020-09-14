import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplatesComponent } from './templates/templates.component';
const routes: Routes = [
  // {
  //   path: '',
  //   component:TestTemplateComponent ,
  //   data: {
  //     title: 'Template'
  //   }
  // },
  {
    path: '',
    redirectTo: 'templates',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TemplatesComponent,
    data: {
      title: 'Template'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
