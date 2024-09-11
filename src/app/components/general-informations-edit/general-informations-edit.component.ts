import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.css'
})
export class GeneralInformationsEditComponent {
   @Input({ required: true }) userForm!: FormGroup

   get emailControl(): FormControl {
      return this.userForm.get('generalInformations.email') as FormControl
   }
}
