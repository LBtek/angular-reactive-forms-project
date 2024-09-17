import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { StatesService } from '../../services/states.service';
import { CountriesList } from '../../types/countries-list';
import { distinctUntilChanged, Subscription, take } from 'rxjs';
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

   private userFormValueChangesSubs!: Subscription

   private readonly _countriesService = inject(CountriesService)
   private readonly _statesService = inject(StatesService)

   @Input({ required: true }) userSelected: IUser = {} as IUser
   @Input({ required: true }) isInEditMode: boolean = false

   @Output('onFormStatusChange') onFormStatusChangeEmitt = new EventEmitter<boolean>()
   @Output('onFormFirstChange') onUserFormFirstChangeEmitt = new EventEmitter<void>()

   ngOnInit() {
      this.onUserFormStatusChange();
      this.getCountriesList()
   }

   ngOnChanges(changes: SimpleChanges) {
      const HAS_USER_SELECTED = changes['userSelected'] && Object.keys(changes['userSelected'].currentValue).length > 0

      if (HAS_USER_SELECTED) {
         if (this.userFormValueChangesSubs) {
            this.userFormValueChangesSubs.unsubscribe()
         }
         this.fulfillUserForm(this.userSelected)
         this.getStatesList(this.userSelected.country)
         this.onUserFormFirstChange()
         this.currentTabIndex = 0
      }
   }

   onCountrySelected(countryName: string) {
      this.getStatesList(countryName)
   }

   private onUserFormFirstChange() {
      this.userFormValueChangesSubs = this.userForm.valueChanges
         .subscribe(() => this.onUserFormFirstChangeEmitt.emit())
   }

   private onUserFormStatusChange() {
      this.userForm.statusChanges
         .pipe(distinctUntilChanged())
         .subscribe(() => this.onFormStatusChangeEmitt.emit(this.userForm.valid))
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
