import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/custom-validators';
import { ContactForm } from '../models/ContactForm.model';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styles: [],
})
export class ContactComponent {
  @Input() form: FormGroup;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  get zip(): FormControl | null {
    return this.form.get('zip') as FormControl;
  }

  static generateContactForm(id: number, zip?: string): FormGroup {
    return new FormGroup<ContactForm>(
      {
        id: new FormControl(id, { nonNullable: true, validators: [Validators.required] }),
        firstname: new FormControl('', { nonNullable: true }),
        lastname: new FormControl('', { nonNullable: true }),
        zip: new FormControl(zip, [Validators.required, Validators.minLength(5)]),
      },
      { validators: CustomValidators.FirstNameAndLastNameMustNotEqual() }
    );
  }

  onRemove = () => this.delete.emit(this.form.get('id')?.value);
}
