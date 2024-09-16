import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersListResponse } from '../../types/users-list-response';

@Component({
   selector: 'app-users-list',
   templateUrl: './users-list.component.html',
   styleUrl: './users-list.component.css',
})
export class UsersListComponent {
   userSelectedIndex: number | undefined

   @Input({ required: true }) isInEditMode: boolean = false

   @Input({ required: true })
   usersList: UsersListResponse = []

   @Output('onUserSelected') onUserSelectedEmitt = new EventEmitter<number>()

   onUserSelected(userIndex: number) {
      if (this.isInEditMode) return

      this.userSelectedIndex = userIndex
      this.onUserSelectedEmitt.emit(userIndex)
   }
}
