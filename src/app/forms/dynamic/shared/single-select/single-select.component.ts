import { Component, forwardRef, Input, Provider } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { SingleSelectOption } from '../../models/SingleSelectOption.model';

const SINGLE_SELECT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SingleSelectComponent),
  multi: true,
};

const SINGLE_SELECT_VALIDATORS: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SingleSelectComponent),
  multi: true,
};

@Component({
  selector: 'single-select',
  templateUrl: './single-select.component.html',
  providers: [SINGLE_SELECT_VALUE_ACCESSOR, SINGLE_SELECT_VALIDATORS],
})
export class SingleSelectComponent implements ControlValueAccessor {
  @Input() options: SingleSelectOption[];
  @Input() label: string;
  @Input() readonly: boolean = false;

  option: SingleSelectOption | undefined;
  disabled: boolean;
  onChanged: any = () => {};
  onTouched: any = () => {};

  ngOnInit() {}

  writeValue(value: string): void {
    if (value) {
      const option = this.options.filter((option) => {
        const disabled = option.disabled === undefined ? false : option.disabled;
        return option.value == value && !disabled;
      })[0];
      if (option) {
        this.option = option;
      }
    } else {
      this.option = undefined;
    }
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(ctrl: AbstractControl): ValidationErrors | null {
    return null;
  }

  setOption(option?: SingleSelectOption) {
    if (!this.disabled) {
      this.option = option;
      this.onChanged(this.option ? this.option.value : '');
      this.onTouched();
    }
  }
}
