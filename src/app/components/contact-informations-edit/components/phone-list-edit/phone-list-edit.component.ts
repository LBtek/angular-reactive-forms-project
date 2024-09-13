import { Component, Input } from '@angular/core';
import { preparePhoneList } from '../../../../utils/prepare-phone-list';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone-list-edit',
  templateUrl: './phone-list-edit.component.html',
  styleUrl: './phone-list-edit.component.css'
})
export class PhoneListEditComponent {
   @Input({ required: true }) userForm!: FormGroup

   get phoneList(): FormArray {
      return this.userForm.get('contactInformations.phoneList') as FormArray
   }
}
