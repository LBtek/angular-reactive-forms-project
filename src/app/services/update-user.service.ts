import { Injectable } from "@angular/core"
import { map, Observable } from "rxjs"
import { IUser } from "../interfaces/user/user.interface"

@Injectable({
   providedIn: 'root'
})
export class UpdateUserService {
   constructor() { }

   updateUser(newUser: IUser): Observable<IUser> {
      return new Observable<{ status: number, body: IUser }>((observer) => {
         setTimeout(() => {
            observer.next({ status: 200, body: structuredClone(newUser) })
            observer.complete()
         }, 500)
      }).pipe(
         map((updateUserResponse) => updateUserResponse.body)
      )
   }
}
