import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddressList } from '../../../../types/address-list';
import { IAddressToDisplay } from '../../../../interfaces/address-to-display.interface';
import { prepareAddressList } from '../../../../utils/prepare-address-list';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.css'
})
export class AddressListComponent implements OnChanges {
   addressListToDisplay: IAddressToDisplay[] = []

   @Input({ required: true }) userAddressList: AddressList | undefined = []

   ngOnChanges(changes: SimpleChanges) {
      const ADDRESS_LIST_LOADED = Array.isArray(changes['userAddressList'].currentValue)

      if (ADDRESS_LIST_LOADED) {
         this.prepareAddressListToDisplay()
      }
   }

   private prepareAddressListToDisplay() {
      this.addressListToDisplay = []

      prepareAddressList(this.userAddressList || [], true, (address) => {
         this.addressListToDisplay.push(address)
      })
   }
}
