import { Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

export class CustomValidators extends Validators {

  static minimumAge(n: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const value: Date = c.value;
      if (!c.value) return null;
      let isAbove = moment().subtract(n, 'year') >= moment(value);
      return isAbove ? null : { underAge: true };
    };
  }

  static mustMatch(control1: string, control2: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[control1];
      const matchingControl = formGroup.controls[control2];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}