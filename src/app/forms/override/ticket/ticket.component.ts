import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { OrderComponent } from './order/order.component';

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() cusips: string[];
  @Input() account: string;
  @Input() side: 'sell' | 'buy' | undefined;

  form: FormGroup;
  constructor() {}

  get orders(): FormArray<FormGroup> {
    return this.form.get('orders') as FormArray;
  }

  ngOnInit(): void {
    let orders: FormGroup[] = this.cusips
      ? this.cusips.map((cusip) => {
          return OrderComponent.generateOrderForm({ cusip: cusip, account: this.account, side: this.side });
        })
      : [];
    this.form = new FormGroup({ orders: new FormArray(orders) });
  }

  addOrder() {
    this.orders.push(OrderComponent.generateOrderForm({ cusip: undefined, account: this.account, side: this.side }));
  }

  removeOrder(id: number) {
    this.orders.removeAt(this.orders.value.findIndex((o) => o.id === id));
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close.emit();
    }
  }
}
