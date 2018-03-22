import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export function matchOtherValidator(otherControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const parent = control.parent;
    if (!parent) {
      return null;
    }
    const otherControl = parent.get(otherControlName) as FormControl;
    otherControl.valueChanges.subscribe(() => {
      control.updateValueAndValidity();
    });
    const different = control.value !== otherControl.value;
    return different ? {'matchOther': true} : null;
  };
}
