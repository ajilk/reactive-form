import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static CityValidator(city: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const allowedCity = (control.value as string).toLowerCase() == city;
      return !allowedCity ? { city: { value: control.value } } : null;
    };
  }

  static FieldEqual(formControlName: string, value: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control: FormControl = formGroup.get(formControlName) as FormControl;
      const equal = control.value === value;
      return !equal ? { FieldEqual: { field: formControlName, value: control.value, expected: value } } : null;
    };
  }

  static FirstNameAndLastNameMustNotEqual(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const firstname: FormControl = formGroup.get('firstname') as FormControl;
      const lastname: FormControl = formGroup.get('lastname') as FormControl;
      if (firstname.value === lastname.value) {
        lastname?.setErrors({ FirstNameAndLastNameAreEqual: true });
      } else {
        lastname?.setErrors(null);
      }
      return null;
    };
  }
}
