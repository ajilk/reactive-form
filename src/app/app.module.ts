import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './forms/basic/basic.component';
import { NumericDirective } from './directives/numeric.directive';
import { DynamicComponent } from './forms/dynamic/dynamic.component';
import { ContactComponent } from './forms/dynamic/contact/contact.component';
import { SingleSelectComponent } from './forms/dynamic/shared/single-select/single-select.component';

@NgModule({
  declarations: [AppComponent, BasicComponent, NumericDirective, DynamicComponent, ContactComponent, SingleSelectComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
