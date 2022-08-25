import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists.component';
import {FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";



@NgModule({
    declarations: [
        PlaylistsComponent
    ],
    exports: [
        PlaylistsComponent
    ],
    imports: [
        CommonModule,
        FlexModule,
        MatIconModule,
        FormsModule,
        MatTabsModule,
        ReactiveFormsModule
    ]
})
export class PlaylistsModule { }
