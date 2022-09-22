import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-override',
  templateUrl: './override.component.html',
  styleUrls: ['./override.component.scss'],
})
export class OverrideComponent implements OnInit {
  ticketVisible: boolean = false;
  account: string;
  cusips: string[] = ['A', 'B', 'C'];
  selectedCusips: string[];
  input: string[];
  side: 'buy' | 'sell' | undefined;

  constructor() {}
  ngOnInit(): void {}

  onOpenTicket() {
    this.input = this.selectedCusips;
    this.ticketVisible = true;
  }

  onSelectionChange(cusips: Set<string>) {
    this.selectedCusips = Array.from(cusips);
  }

  onAction(event: { side: 'buy' | 'sell'; id: number }) {
    this.input = [this.cusips[event.id]];
    this.side = event.side;
    this.ticketVisible = true;
  }

  onModalEvent(event: 'close' | 'submit') {
    switch (event) {
      case 'close':
        this.ticketVisible = false;
        this.side = undefined;
        break;
    }
  }
}
