import { SingleSelectOption } from '../models/SingleSelectOption.model';

export class Constants {
  static Cities: SingleSelectOption[] = <SingleSelectOption[]>[
    { key: 'florida', value: 'Florida', hidden: true },
    { key: 'chicago', value: 'Chicago' },
    { key: 'new_york', value: 'New York' },
    { key: 'california', value: 'California', disabled: true },
  ];

  static Colors: SingleSelectOption[] = <SingleSelectOption[]>[
    { key: 'blue', value: 'Blue' },
    { key: 'red', value: 'Red' },
  ];
}
