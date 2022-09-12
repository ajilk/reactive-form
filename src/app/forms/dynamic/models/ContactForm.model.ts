import { FormControl } from '@angular/forms';

export interface ContactForm {
  id: FormControl<number>;
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  zip: FormControl<number | null | undefined>;
}
