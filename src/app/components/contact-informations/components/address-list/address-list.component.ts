import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddressList } from '../../../../types/address-list';
import { addressTypeDescriptionMap } from '../../../../utils/address-type-description-map';
import { IAddress } from '../../../../interfaces/user/address.interface';
import { AddressTypeEnum } from '../../../../enums/address-type.enum';
import { IAddressToDisplay } from '../../../../interfaces/address-to-display.interface';

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

      Object.keys(addressTypeDescriptionMap).map(Number).forEach((addressType: number) => {
         const addressFound = this.userAddressList?.find((userAddress) => userAddress.type == addressType);

         this.addressListToDisplay.push(this.returnAddressToDisplay(addressFound, addressType))
      })
   }

   private returnAddressToDisplay(addressFound: IAddress | undefined, addressType: number): any {
      if (!addressFound) {
         return {
            typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
            type: addressType,
            street: '-',
            complement: '-',
            country: '-',
            state: '-',
            city: '-'
         }
      }
      return {
         typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
         ...addressFound
      }
   }
}
