import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CustomValidators } from 'src/app/custom-validators';
import { ContactComponent } from './contact/contact.component';
import { ContactForm } from './models/ContactForm.model';
import { SingleSelectOption } from './models/SingleSelectOption.model';
import { Constants } from './shared/constants';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
})
export class DynamicComponent implements OnInit {
  cities: SingleSelectOption[] = JSON.parse(JSON.stringify(Constants.Cities));
  colors: SingleSelectOption[] = Constants.Colors;
  form: FormGroup;
  reset: Subject<boolean> = new Subject();

  ngOnInit(): void {
    this.cities.sort((a, b) => (a.value > b.value ? 1 : -1));
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
    this.color.valueChanges.subscribe((color) => {
      this.color.setValue(color, { onlySelf: true, emitEvent: false });
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

  addContact(zip?: number): void {
    this.contacts.push(ContactComponent.generateContactForm(Date.now(), zip?.toString()));
  }

  removeContact(id?: number): void {
    this.contacts.removeAt(id ? this.contacts.value.findIndex((contact) => contact.id === id) : -1);
  }

  toggleCityVisiblity(key: string) {
    const value = Constants.Cities.find((city: SingleSelectOption) => city.key === key)!.value;
    const idx = this.cities.findIndex((city: SingleSelectOption) => city.key === key);
    if (idx === -1) {
      this.cities.push({ key: key, value: value });
    } else {
      this.cities.splice(idx, 1);
    }
    this.cities.sort((a, b) => (a.value > b.value ? 1 : -1));
  }

  toggleCityEnabled(key: string) {
    this.cities.forEach((city: SingleSelectOption) => {
      if (city.key == key) {
        city.disabled = !city.disabled;
      }
    });
  }

  setCity(key: string) {
    const city: SingleSelectOption = this.cities.filter((city: SingleSelectOption) => city.key === key)[0];
    if (city) {
      const disabled: boolean = city.disabled === undefined ? false : city.disabled;
      if (!disabled) {
        this.city.setValue(city.value);
      }
    }
  }

  resetDropdowns() {
    this.reset.next(true);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
