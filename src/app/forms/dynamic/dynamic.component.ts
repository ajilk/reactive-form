import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/custom-validators';
import { ContactComponent } from './contact/contact.component';
import { ContactForm } from './models/ContactForm.model';
import { SingleSelectOption } from './models/SingleSelectOption.model';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
})
export class DynamicComponent implements OnInit {
  _cities: SingleSelectOption[] = <SingleSelectOption[]>[
    { key: 'florida', value: 'Florida', hidden: true },
    { key: 'chicago', value: 'Chicago' },
    { key: 'new_york', value: 'New York' },
    { key: 'california', value: 'California', disabled: true },
  ];
  cities = JSON.parse(JSON.stringify(this._cities));
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        city: new FormControl(''),
        color: new FormControl(''),
        contacts: new FormArray<FormGroup<ContactForm>>([], {
          validators: [Validators.required, Validators.minLength(2)],
        }),
      },
      { validators: CustomValidators.FieldEqual('city', 'Florida') }
    );
  }

  toggleCityVisiblity(key: string) {
    this.cities.forEach((city: SingleSelectOption) => {
      if (city.key === key) {
        city.hidden = !city.hidden;
      }
    });
  }

  get contacts(): FormArray<FormGroup<ContactForm>> {
    return this.form.get('contacts') as FormArray<FormGroup<ContactForm>>;
  }

  get color(): FormControl<string> {
    return this.form.get('color') as FormControl<string>;
  }

  get city(): FormControl<string> {
    return this.form.get('city') as FormControl<string>;
  }

  get invalidControls(): any[] {
    let invalidControls: any[] = [this.form.errors];
    Object.keys(this.form.controls).forEach((key) => {
      let control = this.form.get(key);
      if (control?.invalid) {
        invalidControls.push(control.errors);
      }
    });
    return invalidControls;
  }

  addContact(zip?: number): void {
    this.contacts.push(ContactComponent.generateContactForm(Date.now(), zip?.toString()));
  }

  removeContact(id?: number): void {
    this.contacts.removeAt(id ? this.contacts.value.findIndex((contact) => contact.id === id) : -1);
  }

  toggleCityEnabled(key: string) {
    this.cities.forEach((city: SingleSelectOption) => {
      if (city.key == key) {
        city.disabled = !city.disabled;
      }
    });
  }

  setCity(key: string) {
    // want
    // undefined => false
    // false => false
    // true => true

    // florida.disabled === true
    //    undefined === true => false
    //    false === true => false
    //    true === true => true

    // florida.disabled === false
    //    undefined === false => true
    //    false === false => true
    //    true === false => false

    //    !(florida.disabled === true || florida.hidden === true)

    const city: SingleSelectOption = this.cities.filter((city: SingleSelectOption) => city.key === key)[0];
    const disabled: boolean = city.disabled === undefined ? false : city.disabled;
    const hidden: boolean = city.hidden === undefined ? false : city.hidden;
    if (!hidden && !disabled) {
      this.city.setValue(city.value);
    }
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
