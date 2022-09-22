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

  batchAccountValue: string;
  batchCusipValue: string;
  checkedOrders: Set<number> = new Set();

  get orders(): FormArray<FormGroup> {
    return this.form.get('orders') as FormArray;
  }

  ngOnInit(): void {
    let orders: FormGroup[] = this.cusips
      ? this.cusips.map((cusip) => {
          return OrderComponent.generateOrderForm({ cusip: cusip, account: this.account, side: this.side });
        })
      : [];
    this.form = new FormGroup({
      orders: new FormArray(orders),
    });
  }

  overrideAccount() {
    if (this.checkedOrders.size > 0) {
      this.orders.controls.forEach((order) => {
        if (this.checkedOrders.has(order.get('id')?.value)) {
          order.get('account')?.setValue(this.batchAccountValue);
        }
      });
    } else {
      this.orders.controls.forEach((order) => {
        order.get('account')?.setValue(this.batchAccountValue);
      });
    }
    this.batchAccountValue = '';
  }

  overrideCusip() {
    if (this.checkedOrders.size > 0) {
      this.orders.controls.forEach((order) => {
        if (this.checkedOrders.has(order.get('id')?.value)) {
          order.get('cusip')?.setValue(this.batchCusipValue);
        }
      });
    } else {
      this.orders.controls.forEach((order) => {
        order.get('cusip')?.setValue(this.batchCusipValue);
      });
    }
    this.batchCusipValue = '';
  }

  onDuplicate(id: number) {
    const idx: number = this.orders.controls.findIndex((order) => order.get('id')?.value === id);
    const order: FormGroup = this.orders.at(idx);
    const copy = OrderComponent.generateOrderForm({
      account: order.get('account')?.value,
      cusip: order.get('cusip')?.value,
      side: order.get('side')?.value,
    });
    this.orders.insert(idx + 1, copy);
  }

  addOrder() {
    this.orders.push(OrderComponent.generateOrderForm({ cusip: undefined, account: this.account, side: this.side }));
  }

  removeOrder(id: number) {
    this.orders.removeAt(this.orders.value.findIndex((o) => o.id === id));
  }

  checkedOrder(event: { id: number; value: boolean }) {
    console.log(event);
    if (event.value) {
      this.checkedOrders.add(event.id);
    } else {
      this.checkedOrders.delete(event.id);
    }
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close.emit();
    }
  }
}
