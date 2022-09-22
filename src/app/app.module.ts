import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './forms/basic/basic.component';
import { NumericDirective } from './directives/numeric.directive';
import { DynamicComponent } from './forms/dynamic/dynamic.component';
import { ContactComponent } from './forms/dynamic/contact/contact.component';
import { SingleSelectComponent } from './forms/shared/single-select/single-select.component';
import { OverrideComponent } from './forms/override/override.component';
import { TicketComponent } from './forms/override/ticket/ticket.component';
import { GridComponent } from './forms/override/grid/grid.component';
import { OrderComponent } from './forms/override/ticket/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    NumericDirective,
    DynamicComponent,
    ContactComponent,
    SingleSelectComponent,
    OverrideComponent,
    TicketComponent,
    GridComponent,
    OrderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
