import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from "@angular/material/core";
import { MatIconModule } from '@angular/material/icon';
import {
   MatDialogActions,
   MatDialogClose,
   MatDialogTitle,
   MatDialogModule
} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
   imports: [
      MatCardModule,
      MatTabsModule,
      MatFormFieldModule,
      MatInputModule,
      MatAutocompleteModule,
      MatRadioModule,
      MatDatepickerModule,
      MatIconModule,
      MatDialogActions,
      MatDialogClose,
      MatDialogTitle,
      MatDialogModule,
      MatButtonModule
   ],
   exports: [
      MatCardModule,
      MatTabsModule,
      MatFormFieldModule,
      MatInputModule,
      MatAutocompleteModule,
      MatRadioModule,
      MatDatepickerModule,
      MatIconModule,
      MatDialogActions,
      MatDialogClose,
      MatDialogTitle,
      MatDialogModule,
      MatButtonModule
   ],
   providers: [
      provideNativeDateAdapter(),
      {
         provide: MAT_DATE_LOCALE,
         useValue: 'pt-BR'
      }
   ],
})
export class AngularMaterialModule {

}
