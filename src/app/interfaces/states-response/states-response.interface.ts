import { IBaseCountriesResponse } from "../base-countries-response.interface";
import { IStateResponseData } from "./state-response-data.interface";

export interface IStatesResponse extends IBaseCountriesResponse {
   data: IStateResponseData
}
