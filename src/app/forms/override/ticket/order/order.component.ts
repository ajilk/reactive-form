import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Constants } from 'src/app/forms/shared/constants';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  Constants = Constants;

  @Input() order: FormGroup;
  @Output() delete: EventEmitter<number> = new EventEmitter();

  detailLayerVisible: boolean = false;

  ngOnInit(): void {}

  get cusip(): FormControl {
    return this.order.get('cusip') as FormControl;
  }

  get account(): FormControl {
    return this.order.get('account') as FormControl;
  }

  get side(): FormControl {
    return this.order.get('side') as FormControl;
  }

  get id(): FormControl {
    return this.order.get('id') as FormControl;
  }

  static generateOrderForm(defaultValue: {
    cusip: string | undefined;
    account: string;
    side: 'buy' | 'sell' | undefined;
  }) {
    return new FormGroup({
      id: new FormControl(Date.now()),
      cusip: new FormControl(defaultValue.cusip),
      account: new FormControl(defaultValue.account),
      side: new FormControl(defaultValue.side === undefined ? 'buy' : defaultValue.side),
    });
  }
}
