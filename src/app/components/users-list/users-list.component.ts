import { Component, Input } from '@angular/core';
import { UsersListResponse } from '../../types/users-list-response';

@Component({
   selector: 'app-users-list',
   templateUrl: './users-list.component.html',
   styleUrl: './users-list.component.css',
})
export class UsersListComponent {
   @Input({ required: true })
   usersList: UsersListResponse = []

}
