import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Constants } from 'src/app/forms/shared/constants';
import { SingleSelectOption } from 'src/app/forms/shared/single-select/SingleSelectOption.model';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  Constants = Constants;

  @Input() order: FormGroup;
  ngOnInit(): void {}
  showDetailLayer: boolean = false;

  get cusip(): FormControl {
    return this.order.get('cusip') as FormControl;
  }

  get account(): FormControl {
    return this.order.get('account') as FormControl;
  }

  get side(): FormControl {
    return this.order.get('side') as FormControl;
  }

  static generateOrderForm(cusip: string, account: string, side: 'buy' | 'sell' | undefined) {
    return new FormGroup({
      cusip: new FormControl(cusip),
      account: new FormControl(account),
      side: new FormControl(side === undefined ? 'buy' : side),
    });
  }
}
