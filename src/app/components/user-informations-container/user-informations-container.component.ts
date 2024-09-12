import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { StatesService } from '../../services/states.service';
import { CountriesList } from '../../types/countries-list';
import { take } from 'rxjs';
import { StatesList } from '../../types/states-list';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.css'
})
export class UserInformationsContainerComponent extends UserFormController implements OnInit, OnChanges {
   currentTabIndex: number = 0

   countriesList: CountriesList = []
   statesList: StatesList = []

   private readonly _countriesService = inject(CountriesService)
   private readonly _statesService = inject(StatesService)

   @Input({ required: true }) userSelected: IUser = {} as IUser
   @Input({ required: true }) isInEditMode: boolean = false

   ngOnInit() {
      this.getCountriesList()
   }

   ngOnChanges(changes: SimpleChanges) {
      this.currentTabIndex = 0

      const HAS_USER_SELECTED = changes['userSelected'] && Object.keys(changes['userSelected'].currentValue).length > 0

      if (HAS_USER_SELECTED) {
         this.fulfillUserForm(this.userSelected)
         this.getStatesList(this.userSelected.country)
      }
   }

   onCountrySelected(countryName: string) {
      this.getStatesList(countryName)
   }

   private getCountriesList() {
      this._countriesService.getCountries().pipe(take(1)).subscribe((countriesList: CountriesList) => {
         this.countriesList = countriesList
      })
   }

   private getStatesList(country: string) {
      this._statesService.getStates(country).pipe(take(1)).subscribe((statesList: StatesList) => {
         this.statesList = statesList
      })
   }
}
