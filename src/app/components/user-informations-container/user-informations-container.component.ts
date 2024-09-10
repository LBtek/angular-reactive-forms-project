import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.css'
})
export class UserInformationsContainerComponent implements OnChanges {
   currentTabIndex: number = 1

   @Input({ required: true }) userSelected: IUser = {} as IUser
   @Input({ required: true }) isInEditMode: boolean = false

   ngOnChanges(_: SimpleChanges) {
      this.currentTabIndex = 0
   }
}
