import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService  {

  constructor() { }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName]; //password 
        const matchingControl = formGroup.controls[matchingControlName]; //confirm password
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mismatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
}
