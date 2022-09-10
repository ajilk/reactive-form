import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent implements OnInit {
  constructor() {
    this.city?.valueChanges.subscribe((city) => {
      console.log('only fired when blurred out', city);
    });
  }
  ngOnInit(): void {}

  form: FormGroup = new FormGroup({
    firstname: new FormControl('initial value', { nonNullable: true }),
    lastname: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl('', { validators: this.cityValidator('brooklyn'), updateOn: 'blur' }),
      state: new FormControl(''),
      zip: new FormControl(null, {
        validators: [
          Validators.required,
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

  get city() {
    return this.form.get('address')?.get('city');
  }

  cityValidator(city: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const allowedCity = (control.value as string).toLowerCase() == city;
      return !allowedCity ? { city: { value: control.value } } : null;
    };
  }

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
