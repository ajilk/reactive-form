import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { ContactForm } from './models/ContactForm.model';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
})
export class DynamicComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  get contacts(): FormArray<FormGroup<ContactForm>> {
    return this.form.get('contacts') as FormArray<FormGroup<ContactForm>>;
  }

  form: FormGroup = new FormGroup({
    color: new FormControl(''),
    contacts: new FormArray<FormGroup<ContactForm>>([ContactComponent.generateContactForm(Date.now())]),
  });

  addContact(zip?: number): void {
    this.contacts.push(ContactComponent.generateContactForm(Date.now(), zip));
  }

  removeContact(id?: number): void {
    this.contacts.removeAt(id ? this.contacts.value.findIndex((contact) => contact.id === id) : -1);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
