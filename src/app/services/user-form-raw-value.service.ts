import { Injectable } from "@angular/core"
import { FormGroup } from "@angular/forms"
import { IUserFormRawValue } from "../interfaces/user-form-raw-value.interface"

@Injectable({
   providedIn: 'root'
})
export class UserFormRawValueService {
   private userForm: FormGroup | undefined

   setUserFormRef(userForm: FormGroup): void {
      this.userForm = userForm
   }

   getUserFormRawValue(): IUserFormRawValue {
      return this.userForm?.getRawValue()
   }
}
