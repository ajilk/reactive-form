import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'basic',
  templateUrl: './basic.component.html'
})
export class BasicComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstname: new FormControl('initial value', { nonNullable: true }),
    lastname: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(null, {
        validators: [
          Validators.minLength(5),
          Validators.maxLength(5),
          Validators.pattern('^[0-9]*$'),
        ],
      }),
    }),
  });

  get zip() {
    return this.form.get('address')?.get('zip');
  }

  constructor() {}

  ngOnInit(): void {}

  override() {
    this.form.patchValue({
      firstname: 'Azimjon',
      lastname: 'Ilkhomov',
      address: {
        street: 'Cool Street',
        city: 'Brooklyn',
        state: 'NY',
        zip: 22222,
      },
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onClear() {
    this.form.reset({ lastname: '', address: { street: '', city: '', state: '' } });
  }
}
