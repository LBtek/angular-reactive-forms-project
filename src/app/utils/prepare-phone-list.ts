import { PhoneTypeEnum } from "../enums/phone-type.enum"
import { IPhoneToDisplay } from "../interfaces/phone-to-display.interface"
import { IPhone } from "../interfaces/user/phone.interface"
import { PhoneList } from "../types/phone-list"
import { phoneTypeDescriptionMap } from "./phone-type-description-map"

export const preparePhoneList = (
   userPhoneList: PhoneList,
   isToDisplayPhone: boolean,
   callback: (phone: IPhoneToDisplay) => void
) => {
   Object.keys(phoneTypeDescriptionMap).map(Number).forEach((phoneType: number) => {
      const phoneFound = userPhoneList.find((userPhone: IPhone) => userPhone.type === phoneType)

      let phoneNumber = ''

      if (isToDisplayPhone) {
         phoneNumber = phoneFound ? formatPhoneNumberToDisplay(phoneFound) : '-'
      } else {
         phoneNumber = phoneFound ? formatPhoneNumberToEdit(phoneFound) : ''
      }

      callback({
         type: phoneType,
         typeDescription: phoneTypeDescriptionMap[phoneType as PhoneTypeEnum],
         phoneNumber
      })
   })
}

const formatPhoneNumberToDisplay = (phone: IPhone) => {
   return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`
}

const formatPhoneNumberToEdit = (phone: IPhone) => {
   return `${phone.internationalCode}${phone.areaCode}${phone.number}`.replace(/[+\-]/g, '')
}
