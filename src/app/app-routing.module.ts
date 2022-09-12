import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './forms/basic/basic.component';
import { DynamicComponent } from './forms/dynamic/dynamic.component';

const routes: Routes = [
  { path: 'dynamic', component: DynamicComponent },
  { path: '', component: BasicComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
