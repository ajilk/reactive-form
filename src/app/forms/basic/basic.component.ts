import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
    }),
  });

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
        zip: 10000,
      },
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onClear() {
    this.form.reset({
      firstname: '',
      lastname: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
    });
  }
}
