import { IUserFormAddress, IUserFormDependent, IUserFormGeneralInformations, IUserFormPhone, IUserFormRawValue } from "../interfaces/user-form-raw-value.interface";
import { IUser } from "../interfaces/user/user.interface";
import { AddressList } from "../types/address-list";
import { DependentsList } from "../types/dependents-list";
import { PhoneList } from "../types/phone-list";
import { convertDateObjToPtBrDate } from "./convert-date-obj-to-pt-br-date";

export const convertUserFormToUser = (userFormRawValue: IUserFormRawValue): IUser => {
   let newUser: Partial<IUser> = {}

   newUser = {
      ...convertGeneralInformations(userFormRawValue.generalInformations),
      phoneList: convertPhoneList(userFormRawValue.contactInformations.phoneList),
      addressList: convertAddressList(userFormRawValue.contactInformations.addressList),
      dependentsList: convertDependentsList(userFormRawValue.dependentsList)
   }

   return newUser as IUser
}

const convertGeneralInformations = (generalInformations: IUserFormGeneralInformations): Partial<IUser> => {
   return {
      name: generalInformations.name,
      email: generalInformations.email,
      country: generalInformations.country,
      state: generalInformations.state,
      maritalStatus: generalInformations.maritalStatus,
      monthlyIncome: generalInformations.monthlyIncome,
      birthDate: convertDateObjToPtBrDate(generalInformations.birthDate)
   }
}

const formatNumber = (number: string): string => number.slice(0, -4) + "-" + number.slice(-4)

const convertPhoneList = (phoneList: IUserFormPhone[]): PhoneList => {
   const newUserPhoneList: PhoneList = phoneList
      .filter((phone) => phone.number !== '')
      .map((phone) => ({
         type: phone.type,
         internationalCode: '+' + phone.number.substring(0, 2),
         areaCode: phone.number.substring(2, 4),
         number: formatNumber(phone.number.substring(4))
      }))

   return newUserPhoneList
}

const convertAddressList = (addressList: IUserFormAddress[]): AddressList => {
   const newUserAddressList: AddressList = addressList
      .filter((address) => address.street !== '')
      .map((address) => ({
         type: address.type,
         street: address.street,
         complement: address.complement,
         country: address.country,
         state: address.state,
         city: address.city
      }))

   return newUserAddressList
}

const convertDependentsList = (dependentsList: IUserFormDependent[]): DependentsList => {
   const newUserDependentsList: DependentsList = dependentsList.map((dependent) => ({
      name: dependent.name,
      age: Number(dependent.age),
      document: Number(dependent.document)
   }))

   return newUserDependentsList
}
