import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() rows: string[];
  @Output() selectionChanged: EventEmitter<Set<string>> = new EventEmitter();
  @Output() action: EventEmitter<{ side: 'buy' | 'sell'; id: number }> = new EventEmitter();
  selected: Set<string> = new Set<string>();

  constructor() {}

  ngOnInit(): void {}

  onSelect(index: number, event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.selected.add(this.rows[index]);
    } else {
      this.selected.delete(this.rows[index]);
    }
    this.selectionChanged.emit(this.selected);
  }

  onAction(side: 'buy' | 'sell', id: number) {
    this.action.emit({ side: side, id: id });
  }
}
