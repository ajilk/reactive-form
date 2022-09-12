import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static CityValidator(city: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const allowedCity = (control.value as string).toLowerCase() == city;
      return !allowedCity ? { city: { value: control.value } } : null;
    };
  }
}
