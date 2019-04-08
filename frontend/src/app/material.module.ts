import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatSnackBarModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatSnackBarModule
    ]
})
export class MaterialModule {}
