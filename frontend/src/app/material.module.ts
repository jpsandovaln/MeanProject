import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatTableModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatTableModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatTableModule
    ]
})
export class MaterialModule {}
