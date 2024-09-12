import { MaritalStatusEnum } from "../enums/marital-status.enum";

export const maritalStatusDescriptionMap: { [key in MaritalStatusEnum]: string} = {
   [MaritalStatusEnum.SINGLE]: 'Solteiro',
   [MaritalStatusEnum.MARRIED]: 'Casado',
   [MaritalStatusEnum.DIVORCED]: 'Divorciado'
}

export const maritalStatusArray = Object.entries(maritalStatusDescriptionMap).map((entry) => {
   return {
      code: Number(entry[0]),
      description: entry[1]
   }
})
