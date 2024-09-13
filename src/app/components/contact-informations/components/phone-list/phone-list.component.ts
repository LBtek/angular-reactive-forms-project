import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PhoneList } from '../../../../types/phone-list';
import { IPhoneToDisplay } from '../../../../interfaces/phone-to-display.interface';
import { preparePhoneList } from '../../../../utils/prepare-phone-list';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.css'
})
export class PhoneListComponent implements OnChanges {
   phoneListToDisplay: IPhoneToDisplay[] = []

   @Input({ required: true }) userPhoneList: PhoneList | undefined = []

   ngOnChanges(changes: SimpleChanges) {
      const PHONE_LIST_LOADED = Array.isArray(changes['userPhoneList'].currentValue)

      if (PHONE_LIST_LOADED) {
         this.preparePhoneListToDisplay()
      }

   }

   private preparePhoneListToDisplay() {
      this.phoneListToDisplay = []

      preparePhoneList(this.userPhoneList || [], true, (phone) => {
         this.phoneListToDisplay.push(phone)
      })
   }
}
