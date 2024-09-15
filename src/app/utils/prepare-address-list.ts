import { AddressTypeEnum } from "../enums/address-type.enum";
import { IAddressToDisplay } from "../interfaces/address-to-display.interface";
import { IAddress } from "../interfaces/user/address.interface";
import { AddressList } from "../types/address-list";
import { addressTypeDescriptionMap } from "./address-type-description-map";

export const prepareAddressList = (
   userAddressList: AddressList,
   isToDisplayAddress: boolean,
   callback: (address: IAddressToDisplay) => void
) => {
   Object.keys(addressTypeDescriptionMap).map(Number).forEach((addressType: number) => {
      const addressFound = userAddressList.find((userAddress) => userAddress.type == addressType);

      callback(returnAddress(addressFound, addressType, isToDisplayAddress))
   })
}

const returnAddress = (
   addressFound: IAddress | undefined,
   addressType: number,
   isToDisplayAddress: boolean
): IAddressToDisplay => {

   if (!addressFound) {
      const textValue = isToDisplayAddress ? '-' : ''

      return {
         typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
         type: addressType,
         street: textValue,
         complement: textValue,
         country: textValue,
         state: textValue,
         city: textValue
      }
   }

   return {
      typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
      ...addressFound
   }
}

