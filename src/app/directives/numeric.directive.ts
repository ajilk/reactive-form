import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[numeric]' })
export class NumericDirective {
  @Input() length: number | undefined;

  constructor(private el: ElementRef) {}
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste',
  ];

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (
      this.navigationKeys.includes(e.key) ||
      (e.key === 'a' && e.ctrlKey === true) ||
      (e.key === 'c' && e.ctrlKey === true) ||
      (e.key === 'v' && e.ctrlKey === true) ||
      (e.key === 'x' && e.ctrlKey === true) ||
      (e.key === 'a' && e.metaKey === true) ||
      (e.key === 'c' && e.metaKey === true) ||
      (e.key === 'v' && e.metaKey === true) ||
      (e.key === 'x' && e.metaKey === true)
    ) {
      return;
    }
    const numeric = /\d/i.test(e.key);
    const validLength = this.length ? this.el.nativeElement.value.length < this.length : true;
    if (!numeric || !validLength) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const content: string = event.clipboardData?.getData('text/plain') || '';
    const value = content.slice(0, this.length).replace(/\D/g, '');
    (event.target as HTMLInputElement).value = value;
  }
}
